import React from 'react';

const ProfileDetailsSkeleton = () => {
  return (
    <div>
      {/* Photos Section Skeleton */}
      <div className="profile-section mb-4">
        <div className="profile-section-title mb-3" style={{ alignItems: 'center', gap: '8px' }}>
          <div className="skeleton skeleton-title" style={{ width: '140px', height: '22px', borderRadius: '6px' }} />
        </div>
        <div className="skeleton skeleton-rect" style={{ height: '380px', borderRadius: '10px' }} />
      </div>

      {/* Other Sections Skeletons */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <div className="profile-section mb-4" key={idx}>
          <div className="profile-section-title mb-2" style={{ alignItems: 'center', gap: '8px' }}>
            <div className="skeleton skeleton-title" style={{ width: '180px', height: '20px', borderRadius: '6px' }} />
          </div>
          <div className="skeleton skeleton-text" style={{ width: '85%' }} />
          <div className="skeleton skeleton-text" style={{ width: '75%' }} />
          <div className="skeleton skeleton-text" style={{ width: '90%' }} />
        </div>
      ))}
    </div>
  );
};

export default ProfileDetailsSkeleton; 