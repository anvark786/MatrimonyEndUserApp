import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faEye, 
  faUser, 
  faStar,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

const DashboardStats = ({ stats }) => {
  const {
    totalProfiles = 0,
    totalViews = 0,
    totalLikes = 0,
    premiumUsers = 0,
    viewsGrowth = 0,
    likesGrowth = 0
  } = stats;

  const statCards = [
    {
      title: 'Total Profiles',
      value: totalProfiles.toLocaleString(),
      icon: faUser,
      color: 'var(--primary-color)',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      growth: null
    },
    {
      title: 'Profile Views',
      value: totalViews.toLocaleString(),
      icon: faEye,
      color: 'var(--info-color)',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      growth: viewsGrowth
    },
    {
      title: 'Total Likes',
      value: totalLikes.toLocaleString(),
      icon: faHeart,
      color: 'var(--danger-color)',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      growth: likesGrowth
    },
    {
      title: 'Premium Users',
      value: premiumUsers.toLocaleString(),
      icon: faStar,
      color: 'var(--secondary-color)',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      growth: null
    }
  ];

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              <FontAwesomeIcon icon={stat.icon} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              {stat.growth !== null && (
                <div className={`stat-growth ${stat.growth >= 0 ? 'positive' : 'negative'}`}>
                  <FontAwesomeIcon 
                    icon={stat.growth >= 0 ? faArrowUp : faArrowDown} 
                    className="growth-icon"
                  />
                  <span>{Math.abs(stat.growth)}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats; 