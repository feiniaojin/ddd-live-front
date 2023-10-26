import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Input, Select, Cascader, Upload, message, DatePicker, } from 'antd';
import ReactPlayer from 'react-player';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import styles from './index.module.scss'

// function VideoPlayer({ src='https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv' }) {
  // function VideoPlayer({ src='http://dev.jd.com:3000/876b710d98c2430eb32367cf3dabd864.m3u8'}) {
    // function VideoPlayer({ src='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4'}) {
const App = (props) => {
  const { visible, onShow, src = "https://www.w3schools.com/html/movie.mp4" } = props;
  const [fullScreen, setFullScreen] = useState(false)
console.log('src',src)
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
  }, [src]);

  const handleOk = () => {
    onShow(false, null);
  };
  const handleCancel = () => {
    onShow(false, null);
  };
  return (
    <Modal width={800} className={styles.viewPlay} title={null} open={visible} footer={null} onOk={handleOk} onCancel={handleCancel}>
     <video style={{height:'100%'}}  playsInline poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg" ref={videoRef} controls crossOrigin>
        <source src={src} 
        // type="application/x-mpegURL"
         />
      </video>
    </Modal>
  );
};
export default App;


