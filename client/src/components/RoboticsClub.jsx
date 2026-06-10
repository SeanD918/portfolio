import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Radio, ShieldCheck, Zap } from 'lucide-react';

export default function RoboticsClub() {
  const [logs, setLogs] = useState([
    { time: '0.00s', type: 'info', msg: 'ESP32 RTOS core initialized.' },
    { time: '0.12s', type: 'info', msg: 'Calibrating MPU6050 gyroscope...' },
    { time: '0.54s', type: 'info', msg: 'MPU6050 calibration successful. Offsets set.' },
    { time: '0.88s', type: 'info', msg: 'Connecting to LIDAR sensor via UART2...' },
    { time: '1.20s', type: 'info', msg: 'LIDAR scanner online. Frequency: 10 Hz.' },
    { time: '1.50s', type: 'info', msg: 'PID motor control loop active. kp=0.8, ki=0.15, kd=0.04' },
    { time: '1.80s', type: 'info', msg: 'System status: ONLINE. Awaiting drive command.' }
  ]);

  const logBodyRef = useRef(null);

  // Generate randomized robotics log stream items
  useEffect(() => {
    const logMessages = [
      { type: 'info', msg: 'LIDAR sweep: 0 obstacles in 1m path.' },
      { type: 'info', msg: 'Battery voltage nominal: 11.92V' },
      { type: 'info', msg: 'Speed command received: v=0.25m/s, w=0.0rad/s' },
      { type: 'info', msg: 'Differential drive odometry update: x=1.23, y=0.45, theta=12.4°' },
      { type: 'warn', msg: 'Minor slip detected on Right Encoder. Correcting PID.' },
      { type: 'info', msg: 'Target waypoint reached: [X: 2.50, Y: 1.00]' },
      { type: 'info', msg: 'LIDAR sweep: Static obstacle found at 180° (42 cm)' },
      { type: 'warn', msg: 'Obstacle in local costmap window. Planning local route.' },
      { type: 'info', msg: 'Rerouting: Executing dynamic path avoidance trajectory.' },
      { type: 'info', msg: 'Waypoint bypass completed successfully.' },
      { type: 'info', msg: 'Battery update: 11.76V (Estimated 42 minutes remaining)' },
      { type: 'error', msg: 'I2C sensor timeout on line 1. Re-establishing link...' },
      { type: 'info', msg: 'I2C connection recovered. IMU values back online.' }
    ];

    const interval = setInterval(() => {
      const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
      const currentTime = (performance.now() / 1000).toFixed(2) + 's';
      
      setLogs((prevLogs) => [
        ...prevLogs.slice(-20), // Keep only the last 20 logs to avoid DOM overload
        { time: currentTime, type: randomMsg.type, msg: randomMsg.msg }
      ]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll the log stream body to the bottom when new logs arrive
  useEffect(() => {
    if (logBodyRef.current) {
      logBodyRef.current.scrollTop = logBodyRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section id="robotics" className="section">
      <div className="section-header">
        <span className="section-subtitle">Additional Projects</span>
        <h2 className="section-title">Robotics & Systems Engineering</h2>
      </div>

      <div className="robotics-club-grid">
        {/* Left: Content & Stats */}
        <div className="robotics-club-content">
          <h3>Autonomous Hardware Labs</h3>
          <p>
            Beyond standard web and mobile systems, I have a deep interest in physical computing and robotics. As a firmware developer for the university's Robotics Club, I spend my spare time designing and coding embedded layers for autonomous competition platforms.
          </p>
          <p>
            This hands-on club experience allows me to apply systems engineering principles to real-time firmware, managing motor controls, low-level sensor buses, and interfacing custom hardware nodes with ROS (Robot Operating System) scripts.
          </p>

          {/* Stats Counters */}
          <div className="robotics-key-stats">
            <div className="glass-card stat-card robotics-accent">
              <span className="stat-num">4+</span>
              <span className="stat-label">Robots Built</span>
            </div>
            <div className="glass-card stat-card robotics-accent">
              <span className="stat-num">15+</span>
              <span className="stat-label">PCBs Designed</span>
            </div>
            <div className="glass-card stat-card robotics-accent">
              <span className="stat-num">2</span>
              <span className="stat-label">Tech Awards</span>
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry Terminal Log Stream */}
        <div className="log-stream-card">
          <div className="log-stream-header">
            <span className="log-stream-title">
              <Radio size={14} style={{ animation: 'pulse 1.5s infinite' }} />
              Live Serial Telemetry Stream (/dev/ttyUSB0)
            </span>
            <span className="pulse-indicator"></span>
          </div>

          <div className="log-stream-body" ref={logBodyRef}>
            {logs.map((log, index) => (
              <div key={index} className="log-entry">
                <span className="log-time">[{log.time}]</span>
                <span className={`log-type ${log.type}`}>
                  {log.type.toUpperCase()}:
                </span>
                <span className="log-msg">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
