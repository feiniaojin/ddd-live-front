
//关于播放视频的集中尝试
实现方法一

import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url="https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv" }) => {
  return (
    <div>
      <ReactPlayer
        url={'http://jduvideo.jd.com/tenant2-w/tenant1/m3u8/876b710d98c2430eb32367cf3dabd864.m3u8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231025T092923Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=D25F4DA9D4E7147FF2606EC8F25E15CA%2F20231025%2Fcn-north-1%2Fs3%2Faws4_request&X-Amz-Signature=3ff4c62ca6243d6109e9098edd3651b517bde42b8518e1648f61a7909a35a87f'}
        controls={true}
        width="100%"
        height="auto"
        // 添加以下属性以优化加载速度
        pip={true} // 启用画中画模式
        preload="auto" // 自动预加载视频
        playsinline={true} // 在iOS上内联播放
        config={{
          file: {
            forceHLS: true, // 强制使用HLS格式
            // forceFLV: true, // 强制使用FLV格式
            // forceVideo: true, // 强制使用video标签
            attributes: {
              // controlsList: 'nodownload' // 禁用下载按钮
            }
          }
        }}
      />
      {/* <ReactPlayer
  url='http://jduvideo.jd.com/tenant2-w/tenant1/m3u8/876b710d98c2430eb32367cf3dabd864.m3u8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231025T092923Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=D25F4DA9D4E7147FF2606EC8F25E15CA%2F20231025%2Fcn-north-1%2Fs3%2Faws4_request&X-Amz-Signature=3ff4c62ca6243d6109e9098edd3651b517bde42b8518e1648f61a7909a35a87f'
  controls={true}
  width="100%"
  height="auto"
  pip={true}
  preload="auto"
  playsinline={true}
  config={{
    file: {
      forceHLS: true, // Only force HLS
      attributes: {
        // controlsList: 'nodownload'
      }
    }
  }}
/> */}

    </div>
  );
};

export default VideoPlayer;


原生
import React from 'react';

function VideoPlayer() {
  return (
    <video 
      controls 
      width="100%" 
      height="auto"
      src="http://jduvideo.jd.com/tenant2-w/tenant1/m3u8/876b710d98c2430eb32367cf3dabd864.m3u8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231025T092923Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=D25F4DA9D4E7147FF2606EC8F25E15CA%2F20231025%2Fcn-north-1%2Fs3%2Faws4_request&X-Amz-Signature=3ff4c62ca6243d6109e9098edd3651b517bde42b8518e1648f61a7909a35a87f">
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;




以下是一个使用Video.js 7和VHS插件的示例：
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

function VideoPlayer() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        sources: [{
          src: 'http://jduvideo.jd.com/tenant2-w/tenant1/m3u8/876b710d98c2430eb32367cf3dabd864.m3u8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231025T092923Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=D25F4DA9D4E7147FF2606EC8F25E15CA%2F20231025%2Fcn-north-1%2Fs3%2Faws4_request&X-Amz-Signature=3ff4c62ca6243d6109e9098edd3651b517bde42b8518e1648f61a7909a35a87f',
          type: 'application/x-mpegURL'
        }]
      }, () => {
        console.log('player is ready');
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
}

export default VideoPlayer;




方法二
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import flvjs from 'flv.js';
function VideoPlayer({ src='http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8', type='hls' }) {

// function VideoPlayer({ src="https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv", type='flv' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (type === 'flv' && flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: src
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
      } else if (type === 'hls' && Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = src;
      }
      
    }

    return () => {
      if (videoElement) {
        videoElement.src = '';
        videoElement.load();
      }
    };
  }, [src, type]);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%' }} />
    </div>
  );
}




方法三
import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import flvjs from 'flv.js';
import Hls from 'hls.js';
// function VideoPlayer({ src='https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv' }) {
function VideoPlayer({ src='http://dev.jd.com:3000/876b710d98c2430eb32367cf3dabd864.m3u8'}) {
// function VideoPlayer({ src='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4'}) {
const videoRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (Hls.isSupported() && src.indexOf('.m3u8')>-1) {
        // const hls = new Hls();
        // hls.loadSource(src);
        // hls.attachMedia(videoElement);
        // // hls.on(Hls.Events.MANIFEST_PARSED, function() {
        // //   videoElement.play();
        // // });
        // var player = new Plyr(videoElement);
        var player = new Plyr(videoElement, {captions: {active: true, update: true, language: 'en'}});
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);
        window.hls = hls;
        window.player = player;
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          videoElement.requestPictureInPicture().catch(error => {
            console.error('error',error);
          });
        });
        // Handle changing captions
        player.on('languagechange', () => {
          // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
          setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
        });
      }

      if (flvjs.isSupported()&& src.indexOf('.flv')>-1) {
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: src
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.on(flvjs.Events.META_DATA_ARRIVED, function() {
          videoElement.requestPictureInPicture().catch(error => {
            console.error('error',error);
          });
        });
        
        var player = new Plyr(videoElement);
        
    }else{
      var player = new Plyr(videoElement);

    }
    

    
      return () => {
        if (player) {
          player.destroy();
        }
        window.removeEventListener('loadedmetadata',()=>{})
      };
    }
  }, []);

  return (
    <div>
      <video  playsInline poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png" ref={videoRef} controls crossOrigin>
        <source src={src} 
        // type="application/x-mpegURL"
         />
      </video>
    </div>
  );
}

export default VideoPlayer;
//方法五
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Input, Select, Cascader, Upload, message, DatePicker, } from 'antd';
import ReactPlayer from 'react-player';

import videojs from "video.js";
import "video.js/dist/video-js.css";
import flvjs from 'flv.js';
import styles from './index.module.scss'

let player = null;

const App = (props) => {
  const { visible, onShow, link = "https://www.w3schools.com/html/movie.mp4" } = props;
  const [fullScreen, setFullScreen] = useState(false)
  const videoRef = useRef(null);
  /**
   * 初始化
   */
  const init = () => {

    // 添加支持.flv格式的插件
    // player.flvjs({ mediaDataSource: { type: 'flv' } });

    // 添加支持.m3u8格式的插件
    // player.hls();

    //进度
    // if (video_location > 0) {
    //   player?.currentTime(video_location)
    // }
    // 添加事件监听器
    player.on('play', function () {
      console.log('视频开始播放');
    });

    player.on('pause', function () {
      console.log('视频暂停');
    });

    player.on('ended', function () {
      console.log('视频播放结束');
    });
    // 倍速
    player.playbackRates([0.5, 1, 1.5, 2]);
    // 设置默认的倍速
    player.playbackRate(1);

    // 监听倍速变化事件
    player.on('ratechange', function () {
      console.log('当前倍速：', player.playbackRate());
    });

    player.on('fullscreenchange', function () {
      if (player.isFullscreen()) {
        // 进入全屏模式
        console.log('进入全屏模式');
        setFullScreen(true)
      } else {
        // 退出全屏模式
        console.log('退出全屏模式');
        setFullScreen(false)
      }
    });
    /**
     * 自定义按钮
     */
    videojs.registerPlugin('customTool', function () {

      // 展开
      var expandIcon = '<svg t="1690452200131" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2747" width="20" height="20"><path d="M17.066667 2.844444C11.377778 2.844444 8.533333 5.688889 5.688889 8.533333 2.844444 11.377778 0 14.222222 0 19.911111v364.088889c0 2.844444 0 5.688889 2.844444 5.688889h5.688889l122.311111-122.311111 164.977778 164.977778c2.844444 2.844444 8.533333 5.688889 11.377778 5.688888 5.688889 0 8.533333-2.844444 11.377778-5.688888l110.933333-110.933334c2.844444-2.844444 5.688889-8.533333 5.688889-11.377778 0-5.688889-2.844444-8.533333-5.688889-11.377777l-159.288889-170.666667L389.688889 8.533333c2.844444-2.844444 2.844444-2.844444 0-5.688889 0-2.844444-2.844444-2.844444-2.844445-2.844444L17.066667 2.844444zM17.066667 1024c-5.688889 0-8.533333-2.844444-11.377778-5.688889-2.844444-2.844444-5.688889-8.533333-5.688889-11.377778V640c0-2.844444 0-5.688889 2.844444-5.688889h5.688889l122.311111 122.311111 164.977778-164.977778c2.844444-2.844444 8.533333-5.688889 11.377778-5.688888 5.688889 0 8.533333 2.844444 11.377778 5.688888l110.933333 110.933334c2.844444 2.844444 5.688889 8.533333 5.688889 11.377778s-2.844444 8.533333-5.688889 11.377777l-164.977778 164.977778 119.466667 119.466667c2.844444 2.844444 2.844444 2.844444 0 5.688889 0 2.844444-2.844444 2.844444-5.688889 2.844444L17.066667 1024zM1006.933333 2.844444c5.688889 0 8.533333 2.844444 11.377778 5.688889 2.844444 2.844444 5.688889 5.688889 5.688889 11.377778v364.088889c0 2.844444 0 5.688889-2.844444 5.688889h-5.688889l-122.311111-122.311111-164.977778 164.977778c-2.844444 2.844444-8.533333 5.688889-11.377778 5.688888-5.688889 0-8.533333-2.844444-11.377778-5.688888l-110.933333-110.933334c-2.844444-2.844444-5.688889-8.533333-5.688889-11.377778 0-5.688889 2.844444-8.533333 5.688889-11.377777l164.977778-164.977778L640 14.222222c-2.844444-2.844444-2.844444-2.844444 0-5.688889-5.688889-8.533333-2.844444-8.533333-2.844444-8.533333l369.777777 2.844444z m0 1021.155556c5.688889 0 8.533333-2.844444 11.377778-5.688889 2.844444-2.844444 5.688889-8.533333 5.688889-11.377778V640c0-2.844444 0-5.688889-2.844444-5.688889h-5.688889l-122.311111 122.311111-164.977778-164.977778c-2.844444-2.844444-8.533333-5.688889-11.377778-5.688888-5.688889 0-8.533333 2.844444-11.377778 5.688888l-110.933333 110.933334c-2.844444 2.844444-5.688889 8.533333-5.688889 11.377778s2.844444 8.533333 5.688889 11.377777l164.977778 164.977778-119.466667 119.466667c-2.844444 2.844444-2.844444 2.844444 0 5.688889 0 2.844444 2.844444 2.844444 5.688889 2.844444l361.244444 5.688889z" fill="#FFFFFF" p-id="2748"></path></svg>'
      // 收起
      var retractIcon = '<svg t="1690452498609" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4944" width="20" height="20"><path d="M422.648199 431.157895c5.67313 0 8.509695-2.836565 11.346261-5.67313 2.836565-2.836565 5.67313-8.509695 5.67313-11.346261V51.058172c0-2.836565 0-5.67313-2.836565-5.67313h-5.67313L306.34903 170.193906 141.828255 5.67313C138.99169 2.836565 133.31856 0 130.481994 0c-5.67313 0-11.34626 2.836565-14.182825 5.67313L5.67313 116.299169c-2.836565 2.836565-5.67313 8.509695-5.67313 11.34626 0 5.67313 2.836565 11.34626 5.67313 14.182826L170.193906 303.512465l-119.135734 119.135734c-2.836565 2.836565-2.836565 2.836565 0 5.673131 0 2.836565 2.836565 2.836565 5.67313 2.836565h365.916897z m0 156.01108c5.67313 0 8.509695 2.836565 11.346261 5.67313 2.836565 2.836565 5.67313 8.509695 5.67313 11.346261v365.916897c0 2.836565 0 5.67313-2.836565 5.67313h-5.67313L306.34903 850.969529 141.828255 1015.490305c-2.836565 2.836565-8.509695 5.67313-11.346261 5.67313-5.67313 0-8.509695-2.836565-11.34626-5.67313L8.509695 904.864266c-5.67313-2.836565-8.509695-8.509695-8.509695-11.34626s2.836565-8.509695 5.67313-11.346261L170.193906 717.65097l-119.135734-119.135735c-2.836565-2.836565-2.836565-2.836565 0-5.67313 0-2.836565 2.836565-2.836565 5.67313-2.836565l365.916897-2.836565z m175.867036-156.01108c-5.67313 0-8.509695-2.836565-11.34626-5.67313-2.836565-2.836565-5.67313-8.509695-5.67313-11.346261V51.058172c0-2.836565 0-5.67313 2.836565-5.67313h5.67313L714.814404 170.193906 879.33518 5.67313c2.836565-2.836565 8.509695-5.67313 11.34626-5.67313 5.67313 0 8.509695 2.836565 11.346261 5.67313l110.626039 110.626039c5.67313 2.836565 8.509695 8.509695 8.509695 11.34626 0 5.67313-2.836565 8.509695-5.67313 11.346261L850.969529 303.512465l119.135734 119.135734c2.836565 2.836565 2.836565 2.836565 0 5.673131 0 2.836565-2.836565 2.836565-5.67313 2.836565H598.515235z m0 156.01108c-5.67313 0-8.509695 2.836565-11.34626 5.67313-2.836565 2.836565-5.67313 8.509695-5.67313 11.346261v365.916897c0 2.836565 0 5.67313 2.836565 5.67313h5.67313l121.972299-121.972299 164.520776 164.520776c2.836565 2.836565 8.509695 5.67313 11.34626 5.67313 5.67313 0 8.509695-2.836565 11.346261-5.67313l110.626039-110.626039c2.836565-2.836565 5.67313-8.509695 5.67313-11.34626s-2.836565-8.509695-5.67313-11.346261L850.969529 717.65097l119.135734-119.135735c2.836565-2.836565 2.836565-2.836565 0-5.67313 0-2.836565-2.836565-2.836565-5.67313-2.836565l-365.916898-2.836565z" fill="#FFFFFF" p-id="4945"></path></svg>'
      // 状态 true展开 false收起

    });

  }
  useEffect(() => {
    //videojs最新版本调用，flvjs需要查找对应版本，暂时不用该控件
    const videoElement = videoRef.current;
    player = videojs(videoElement, {
      controls: true, // 启用播放器控件
      autoplay: false, // 是否自动播放

      sources: [{
        src: "https://www.w3schools.com/html/movie.mp4",
        type: "video/mp4"
        // {
          // src: link,
          // type: 'video/flv'
        // },
        // {
        //   src: 'your-video-source-url.m3u8',
        //   type: 'application/x-mpegURL'
        // },
        // {
        //   src: 'your-video-source-url.mp4',
        //   type: 'video/mp4'
        // }

      }],

    });
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: link// 替换为您的.flv视频URL
      });
      player.src({ src: '', type: 'video/flv' });
      player.flvjs = flvPlayer;
      player.flvjs.attachMediaElement(videoRef.current);
      player.flvjs.load();
    }
    init()
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [])


  const handleOk = () => {
    onShow(false, null);
  };
  const handleCancel = () => {
    onShow(false, null);
  };
  return (
      
   <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin"></video>
    </div>

  );
};
export default App;


