import React, { useState, useEffect } from 'react';
import { bmiService } from '../http/api';
import '../styles/Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overall');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await bmiService.getStatistics();
      setStats(data);
      setError('');
    } catch (err) {
      setError('Не удалось загрузить статистику. Возможно, сервер недоступен.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="loading-state">Загрузка статистики...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!stats) return null;

  const renderOverallStats = () => (
    <>
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-value">{stats.total_users}</div>
          <div className="stat-label">Всего расчетов</div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-value">{stats.average_bmi.toFixed(1)}</div>
          <div className="stat-label">Средний ИМТ</div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Общее распределение по категориям</h2>
        <div className="bar-chart">
          {Object.entries(stats.overall_category_distribution).map(([category, count]) => {
            const widthPercentage = (count / stats.total_users) * 100;
            let barColor = '#3498db';
            if (category.includes('Ожирение')) barColor = '#e74c3c';
            if (category.includes('Норма')) barColor = '#27ae60';
            if (category.includes('Дефицит')) barColor = '#f39c12';

            return (
              <div key={category} className="chart-row">
                <div className="chart-label">{category}</div>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar" 
                    style={{ 
                      width: `${widthPercentage}%`,
                      backgroundColor: barColor 
                    }}
                  >
                    <span className="bar-tooltip">{count} чел.</span>
                  </div>
                </div>
                <div className="chart-count">{count}</div>
              </div>
            );
          })}
          
          {Object.keys(stats.overall_category_distribution).length === 0 && (
            <div className="no-data">Нет данных для отображения</div>
          )}
        </div>
      </div>
    </>
  );

  const renderCityStats = () => (
    <div className="city-stats-section">
      <h2>Статистика по городам</h2>
      <div className="city-stats-info">
        <p>Всего городов в статистике: {stats.city_statistics.length}</p>
      </div>
      
      <div className="city-stats-grid">
        {stats.city_statistics.map((cityStat) => (
          <div key={cityStat.city} className="city-stat-card">
            <div className="city-name">{cityStat.city}</div>
            <div className="city-stat-row">
              <span className="city-stat-label">Всего расчетов:</span>
              <span className="city-stat-value">{cityStat.total_users}</span>
            </div>
            <div className="city-stat-row">
              <span className="city-stat-label">Средний ИМТ:</span>
              <span className="city-stat-value">{cityStat.average_bmi?.toFixed(1) || '—'}</span>
            </div>
            
            <div className="city-distribution">
              <h4>Распределение:</h4>
              {Object.entries(cityStat.category_distribution).map(([category, count]) => (
                <div key={category} className="city-dist-row">
                  <span className="city-category">{category}:</span>
                  <span className="city-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {stats.city_statistics.length === 0 && (
          <div className="no-city-data">
            <p>Нет данных по городам. Пользователи еще не указывали города при расчетах.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="stats-container">
      <header className="stats-header">
        <h1>Статистика пользователей</h1>
        <p>Агрегированные данные всех расчетов ИМТ в системе</p>
      </header>

      <div className="stats-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overall' ? 'active' : ''}`}
          onClick={() => setActiveTab('overall')}
        >
          Общая статистика
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cities' ? 'active' : ''}`}
          onClick={() => setActiveTab('cities')}
        >
          Статистика по городам
        </button>
      </div>

      {activeTab === 'overall' ? renderOverallStats() : renderCityStats()}

      <div className="actions">
        <button onClick={fetchStats} className="btn-refresh">
          Обновить данные
        </button>
      </div>
    </div>
  );
};

export default Statistics;