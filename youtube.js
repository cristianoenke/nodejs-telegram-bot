const YouTube = require('youtube-node')
const config = require('./youtubeconfig')

const youtube = new YouTube();

youtube.setKey(config.key)

//youtube.search('Termo da busca', numero_de_videos, callback)
function searchVideoURL(message, queryText) {
    return new Promise((resolve, reject) => {
        youtube.search(`music ${queryText}`,2, function(error, result){
            if(!error){
                //console.log(JSON.stringify(result, null, 2));
                const videoIds = result.items.map((item) => item.id.videoId).filter(item =>item);
                const youtubeLinks = videoIds.map(videoId => `http://youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
            } else {
                reject('Ocorreu um erro');
            }
        });
    });
}

module.exports.searchVideoURL = searchVideoURL 