const db = require('../config/database/connection');
const collection = require('../config/database/collection');
const moment = require('moment');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    checkTodayAPOD: async () => {
        const today = moment().format('YYYY-MM-DD');
        const apodExist = await db.get().collection(collection.APOD).findOne({ date: today });
        if (!apodExist) {
            await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${today}`).then(async (response) => {
                const data = response.data; const apod = {
                    date: data.date,
                    title: data.title,
                    explanation: data.explanation,
                    url: data.url,
                    media_type: data.media_type,
                    created_at: new Date()
                };
                if (data.media_type === 'image') {
                    const file = fs.createWriteStream(path.join(__dirname, `../public/apod_images/${data.date}.jpg`));
                    await axios.get(data.url, { responseType: 'stream' }).then(async (response) => {
                        response.data.pipe(file);
                    });
                }
                await db.get().collection(collection.APOD).insertOne(apod);
            });
            const Data = await db.get().collection(collection.APOD).findOne({ date: today });
            return Data;
        } else {
            // return the data
            return apodExist;
        }
    },
    getAPODImageForDate: async (date) => {
        const apodExist = await db.get().collection(collection.APOD).findOne({ date: date });
        if (!apodExist) {
            await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`).then(async (response) => {
                const data = response.data
                const apod = {
                    date: data.date,
                    title: data.title,
                    explanation: data.explanation,
                    url: data.url,
                    media_type: data.media_type,
                    created_at: new Date()
                }
                if (data.media_type === 'image') {
                    const file = fs.createWriteStream(path.join(__dirname, `../public/apod_images/${data.date}.jpg`));
                    await axios.get(data.url, { responseType: 'stream' }).then(async (response) => {
                        response.data.pipe(file);
                    });
                }
                await db.get().collection(collection.APOD).insertOne(apod);
            });
            const data = await db.get().collection(collection.APOD).findOne({ date: date });
            return data;
        } else {
            return apodExist;
        }
    }
};