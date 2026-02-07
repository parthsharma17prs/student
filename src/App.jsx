import React, { useState, useEffect } from 'react';
import {
  Search, Bell, User, LayoutDashboard, Users, Briefcase, Monitor, AppWindow,
  DollarSign, Calendar as CalendarIcon, Star, Settings, ChevronDown,
  MoreVertical, ArrowUpRight, Play, Pause, Clock, Check, MoreHorizontal,
  Moon, Sun
} from 'lucide-react';
import './App.css';

// SVG Icons for stats
const StatIcon = ({ type }) => {
  // Simple placeholders
  return <div className={`stat-icon ${type}`}></div>
};

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="main-layout">
        <div className="welcome-row">
          <div className="welcome-text">
            <h1>Welcome in, <b>Nixtio</b></h1>
          </div>

          <div className="stats-bar">
            <div className="left-stats">
              <StatChip label="Interviews" val="15%" dark />
              <StatChip label="Hired" val="10%" yellow />
              <StatChip label="Project time" val="10%" />
              <StatChip label="Output" val="10%" />
            </div>

            <div className="right-big-stats">
              <BigStat label="Employes" value="78" icon={<Users size={16} />} />
              <BigStat label="Hirings" value="56" icon={<User size={16} />} />
              <BigStat label="Projects" value="203" icon={<Briefcase size={16} />} />
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="left-col">
            <ProfileCard />
          </div>

          {/* Middle Column */}
          <div className="middle-col">
            <div className="middle-top-row">
              <ProgressCard />
              <TimeTrackerCard />
            </div>
            <CalendarCard />
          </div>

          {/* Right Column */}
          <div className="right-col">
            <OnboardingCard />
            <TaskListCard />
          </div>
        </div>
      </main>
    </div>
  );
}

function Header({ theme, toggleTheme }) {
  const navItems = ['Dashboard', 'People', 'Hiring', 'Devices', 'Apps', 'Salary', 'Calendar', 'Reviews', 'Setting'];

  return (
    <header className="top-header">
      <div className="logo-section">
        Crextio
      </div>

      <nav className="nav-links">
        {navItems.map((item, idx) => (
          <a key={item} href="#" className={idx === 0 ? 'highlight' : ''}>{item}</a>
        ))}
      </nav>

      <div className="header-actions">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="icon-btn">
          <Search size={20} />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button className="icon-btn">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}

function StatChip({ label, val, dark, yellow }) {
  let className = 'stat-chip';
  if (dark) className += ' dark';
  if (yellow) className += ' yellow';

  return (
    <div className={className}>
      {/* Visual only since image is complex */}
      <span style={{ opacity: 0.7, marginRight: '8px' }}>{label}</span>
      <span>{val}</span>
    </div>
  );
}

function BigStat({ label, value, icon }) {
  return (
    <div className="big-stat-item">
      <div className="big-stat-val">
        {icon} {value}
      </div>
      <span className="big-stat-label">{label}</span>
    </div>
  )
}

function ProfileCard() {
  const [openSection, setOpenSection] = useState('Devices');

  const toggle = (sec) => setOpenSection(openSection === sec ? null : sec);

  return (
    <div className="profile-card">
      <div className="profile-main" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop)' }}>
        <div className="salary-tag">$1,200</div>
        <div className="profile-info">
          <div className="profile-name">Lara Piterson</div>
          <div className="profile-role">UX/UI Designer</div>
        </div>
      </div>

      <div className="profile-accordion">
        <AccordionItem title="Pension contributions" isOpen={openSection === 'Pension'} onClick={() => toggle('Pension')} />
        <AccordionItem title="Devices" isOpen={openSection === 'Devices'} onClick={() => toggle('Devices')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Monitor size={32} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>MacBook Air</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Version M1</div>
            </div>
            <MoreVertical size={16} style={{ marginLeft: 'auto' }} />
          </div>
        </AccordionItem>
        <AccordionItem title="Compensation Summary" isOpen={openSection === 'Comp'} onClick={() => toggle('Comp')} />
        <AccordionItem title="Employee Benefits" isOpen={openSection === 'Benefits'} onClick={() => toggle('Benefits')} />
      </div>
    </div>
  );
}

function AccordionItem({ title, isOpen, onClick, children }) {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onClick}>
        {title}
        <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children || <div style={{ opacity: 0.5 }}>No details available</div>}
      </div>
    </div>
  );
}

function ProgressCard() {
  const data = [30, 50, 40, 70, 80, 20, 30]; // Mock
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="card progress-card">
      <div className="card-header">
        <div>
          <div className="card-title">Progress</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 300, marginTop: '0.5rem' }}>6.1 h <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Work Time <br /> this week</span></div>
        </div>
        <div className="nav-arrow">
          <ArrowUpRight size={20} />
        </div>
      </div>

      {/* Mock Badge */}
      <div style={{
        position: 'absolute', top: '50%', right: '2rem',
        background: 'var(--accent-secondary)', color: 'black',
        padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600
      }}>
        6h 0%
      </div>

      <div className="chart-bars">
        {data.map((h, i) => (
          <div key={i} className="bar-col">
            <div className="bar-wrapper">
              <div
                className={`bar-fill ${i === 4 ? 'active' : ''}`}
                style={{ height: `${h}%` }}
              ></div>
            </div>
            <span className="day-label">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimeTrackerCard() {
  return (
    <div className="card time-tracker-card">
      <div className="card-header" style={{ width: '100%', justifyContent: 'space-between' }}>
        <div className="card-title">Time tracker</div>
        <div className="nav-arrow" style={{ position: 'static' }}>
          <ArrowUpRight size={20} />
        </div>
      </div>

      <div className="time-tracker">
        <div className="circular-progress" style={{ background: 'conic-gradient(var(--accent-secondary) 0% 75%, var(--input-bg) 75% 100%)' }}>
          <div className="time-center">
            <span className="time-val">02:35</span>
            <span className="time-label">Work Time</span>
          </div>
        </div>

        <div className="tracker-controls">
          <div className="control-btn"><Play size={16} style={{ marginLeft: 2 }} /></div>
          <div className="control-btn"><Pause size={16} /></div>
          <div className="control-btn active" style={{ marginLeft: 'auto' }}><Clock size={18} /></div>
        </div>
      </div>
    </div>
  );
}

function CalendarCard() {
  return (
    <div className="card calendar-card">
      <div className="calendar-header">
        <span className="month-selector">
          <span>August</span>
          <span className="month-active">September 2024</span>
          <span>October</span>
        </span>
      </div>

      <div className="calendar-days">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
          <div key={d} className="day-col">
            <span className="day-name">{d}</span>
            <span className="day-num">{21 + i}</span>
          </div>
        ))}
      </div>

      <div className="events-row">
        <EventItem
          time="8:00 am"
          title="Weekly Team Sync"
          sub="Discuss progress on passports"
          dark
          avatars={[1, 2, 3]}
        />
        <EventItem
          time="10:00 am"
          title="Onboarding Session"
          sub="Introduction hand on many over review"
          avatars={[4, 5]}
        />
      </div>
    </div>
  );
}

function EventItem({ time, title, sub, dark, avatars }) {
  return (
    <div className="event-item" style={{ background: dark ? '#1f2937' : '', color: dark ? 'white' : '' }}>
      <div className="event-time" style={{ color: dark ? '#9ca3af' : '' }}>{time}</div>
      <div className="event-content">
        <div className="event-title" style={{ color: dark ? 'white' : '' }}>{title}</div>
        <div className="event-subtitle" style={{ color: dark ? '#9ca3af' : '' }}>{sub}</div>
      </div>
      <div className="face-pile">
        {avatars.map((a, i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/100?img=${10 + a}`}
            className="face-img"
            alt="avatar"
          />
        ))}
      </div>
    </div>
  );
}

function OnboardingCard() {
  return (
    <div className="card onboarding-card">
      <div className="card-header">
        <div className="card-title">Onboarding</div>
        <div className="big-perc">18%</div>
      </div>

      <div className="onboarding-stats" style={{ marginTop: '1rem' }}>
        <div className="task-pill">Task</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Simple representations of other segments */}
          <div style={{ background: '#374151', width: '40px', borderRadius: '12px' }}></div>
          <div style={{ background: '#9ca3af', width: '30px', borderRadius: '12px' }}></div>
        </div>
      </div>
    </div>
  );
}

function TaskListCard() {
  const tasks = [
    { title: 'Welcome', done: true, id: 1 },
    { title: 'Device Setup', done: true, checked: true, id: 2 },
    { title: 'Project Update', icon: 'msg', id: 3 },
    { title: 'Discuss QA Goals', icon: 'link', sub: 'Sep 15, 14:30', id: 4 },
    { title: 'Sign HR Policy Form', icon: 'link', sub: 'Sep 13, 14:30', id: 5 },
  ];

  return (
    <div className="card task-list-card">
      <div className="task-header">
        <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>Onboarding Task</div>
        <div className="task-count">2/8</div>
      </div>

      <div className="task-list">
        {tasks.map(t => (
          <div key={t.id} className={`task-item ${t.done || t.icon ? 'active' : ''}`}>
            <div className={`check-circle ${t.done ? 'checked' : ''}`}>
              {t.done ? <Check size={14} /> : (t.icon === 'msg' ? <MoreHorizontal size={14} /> : <div className="status-dot"></div>)}
            </div>
            <div className="task-info">
              <div className="task-name">{t.title}</div>
              {t.sub && <div className="task-meta">{t.sub}</div>}
            </div>
            {t.done && <div style={{ color: 'var(--accent-secondary)' }}><Check size={16} fill="var(--accent-secondary)" /></div>}
            {!t.done && <div className={`status-dot ${t.id === 5 ? '' : ''}`} ></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
