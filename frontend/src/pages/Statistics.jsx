import React, { useState, useEffect } from 'react';
import { bmiService } from '../http/api';
import '../styles/Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

//   const maxCount = Math.max(...Object.values(stats.category_distribution || { a: 0 }));

  return (
    <div className="stats-container">
      <header className="stats-header">
        <h1>Статистика пользователей</h1>
        <p>Агрегированные данные всех расчетов ИМТ в системе</p>
      </header>

      <div className="stats-grid">
        {/* Карточка: Всего пользователей */}
        <div className="stat-card primary">
          <div className="stat-value">{stats.total_users}</div>
          <div className="stat-label">Всего расчетов</div>
        </div>

        {/* Карточка: Средний ИМТ */}
        <div className="stat-card secondary">
          <div className="stat-value">{stats.average_bmi.toFixed(1)}</div>
          <div className="stat-label">Средний ИМТ</div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Распределение по категориям</h2>
        <div className="bar-chart">
          {Object.entries(stats.category_distribution).map(([category, count]) => {
            // Расчет ширины полоски в процентах (относительно самой большой категории)
            const widthPercentage = (count / stats.total_users) * 100;
            // Цвет зависит от названия категории (простая логика для красоты)
            let barColor = '#3498db'; // синий по умолчанию
            if (category.includes('Ожирение')) barColor = '#e74c3c'; // красный
            if (category.includes('Норма')) barColor = '#27ae60'; // зеленый
            if (category.includes('Дефицит')) barColor = '#f39c12'; // оранжевый

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
          
          {Object.keys(stats.category_distribution).length === 0 && (
            <div className="no-data">Нет данных для отображения</div>
          )}
        </div>
      </div>

      <div className="actions">
        <button onClick={fetchStats} className="btn-refresh">
          Обновить данные
        </button>
      </div>
    </div>
  );
};

export default Statistics;