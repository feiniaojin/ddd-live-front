import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import 'videojs-swf-dist';
// import 'videojs-contrib-hls';
import flvjs from 'flv.js';

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const player = videojs(videoElement, {
      autoplay: true,
      controls: true,
      sources: [{
        src: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv',
        type: 'flv' // M3U8格式
      }],

    });
    player.ready(function() {
      const tech = player.tech({ IWillNotUseThisInPlugins: true });
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv' // 替换为您的FLV视频文件路径
      });
      flvPlayer.attachMediaElement(tech.el());
      flvPlayer.load();
      flvPlayer.play();
    });
    return () => {
      player.dispose(); // 清理video.js播放器实例
    };
  }, [url]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
