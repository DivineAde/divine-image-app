import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <div className="mb-8">
      <h2
        className="text-[26px] md:text-[30px] font-semibold tracking-tight"
        style={{ color: '#111827', letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1.5 text-[14px] font-normal leading-relaxed" style={{ color: '#6b7280' }}>
          {subtitle}
        </p>
      )}
      {/* Divider */}
      <div className="mt-5 h-px w-full" style={{ background: '#e5e7eb' }} />
    </div>
  )
}

export default Header