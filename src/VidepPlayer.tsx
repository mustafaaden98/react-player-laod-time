import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ReactPlayerProps } from 'react-player';
import BaseReactPlayer from 'react-player/base';

const ReactPlayer = lazy(() => import(/* webpackChunkName: "react-player" */ 'react-player'))

interface VideoPlayerProps {
  playerRef: React.RefObject<BaseReactPlayer<ReactPlayerProps>>
  url?: string
}

export const VidepPlayer: React.FC<VideoPlayerProps> = (props) => {
    const [timer, setTimer] = useState<number>(0);
    const ref = useRef<any>();
    const startTimer = () => {
        console.log('called')
        ref.current = setInterval(() => {
            test()
        }, 1000)
    }
    const test = () => {
        setTimer((oldCount) => oldCount + 1);
    }
    useEffect(() => {
        startTimer()
        return () => clearInterval(ref.current)
    },[])
    
    return (
      <Suspense fallback={<div>LOADING.........</div>}>
        <div style = {{marginBottom: '50px', marginTop:'10px'}}>
          <span style={{color: 'green'}}>Time it takes to laod the video player</span>{" "}
          <span style={{color: 'red', fontSize:'20px'}}>{timer}</span>{" "}
          <span style={{color: 'green'}}>secs</span>
        </div>
        <div style={{height:'75vh'}}>
            <ReactPlayer
            ref={props.playerRef}
            url={props.url}
            width="100%"
            height="100%"
            onReady={() => {
                clearInterval(ref.current);
            }}
            />
        </div>
      </Suspense>
    );
}