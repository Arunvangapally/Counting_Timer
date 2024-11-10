import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import {Button} from 'antd'
import './CountTimer.css'

const CountTimer = () => {
    const [timee,setTimee] = useState(0);
    const [isActive, setActive] = useState(false);
    const [isPause, setPause] = useState(false);
    const intervalRef = useRef(null);

    const handleInput = (event)=>{
        setTimee(parseInt(event.target.value*60));
    }
    const formatTime = ()=>{
        const min = String(Math.floor(timee/60)).padStart(2,'0');
        const sec = String(timee%60).padStart(2,'0');
        return `${min} : ${sec}`;
    }
    const handleStart = ()=>{
        setActive(true);
        setPause(false);
    }
    const handlePause = ()=>{
        setPause(!isPause);
    }
    const handleReset =()=>{
        clearInterval(intervalRef.current);
        setActive(false);
        setPause(false);
        setTimee(0);
    }

    useEffect(()=>{
        if(isActive && !isPause && timee>0){
            intervalRef.current = setInterval(()=>{
                setTimee((prev)=>prev-1)
            },1000)
        }else if(timee===0){
            clearInterval(intervalRef.current);
            setActive(false);
            alert('time is up!..')
        }
        return ()=>clearInterval(intervalRef.current);
    },[isActive,isPause, timee])
  return (
    <div className='container'>
        <h1>Countdown Timer</h1>
        <div className="input-display">
        <input
        type='number'
        // value={timee}
        placeholder='Enter time in minutes'
        onChange={handleInput}
        />
        </div>
        <div>{formatTime()}</div>
        <div className="control-buttons">
        <Button type='primary' onClick={handleStart} disabled={isActive && !isPause}>Start</Button>
        <Button type='primary' onClick={handlePause} disabled={!isActive}>{isPause ? 'Resume' : 'Pause'}</Button>
        <Button type='primary' onClick={handleReset}>Reset</Button>
        </div>
    </div>
  )
}

export default CountTimer
