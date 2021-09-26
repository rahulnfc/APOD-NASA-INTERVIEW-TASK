const APODHelper = require('../helpers/apod');

module.exports = {
    Home: (req, res) => {
        res.render('index', { title: 'APOD' });
    },
    getTodayAPODImage: async (req, res) => {
        const checkAndFind = await APODHelper.checkTodayAPOD();
        // get the image from local folder
        if (checkAndFind.media_type === 'image') {
            const imagePath = `/apod_images/${checkAndFind.date}.jpg`;
            res.status(200).json({ data: { checkAndFind, imagePath } });
        } else {
            res.status(200).json({ data: { checkAndFind } });
        }
    },
    getAPODImageForDate: async (req, res) => {
        const FindByDate = await APODHelper.getAPODImageForDate(req.params.date);
        // get the image from local folder
        if (FindByDate.media_type === 'image') {
            const imagePath = `/apod_images/${FindByDate.date}.jpg`;
            res.status(200).json({ data: { FindByDate, imagePath } });
        } else {
            res.status(200).json({ data: { FindByDate } });
        }
    },
}