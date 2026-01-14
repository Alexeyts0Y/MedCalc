import React, { useState } from 'react';
import { bmiService } from '../http/api';
import '../styles/BMICalculator.css';

const CITIES = [
  '',
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск',
  'Воронеж',
  'Пермь',
  'Волгоград',
  'Другой город'
];

const BMICalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    city: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCityInput, setShowCityInput] = useState(false);
  const [customCity, setCustomCity] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (id === 'city' && value === 'Другой город') {
      setShowCityInput(true);
    } else if (id === 'city') {
      setShowCityInput(false);
      setCustomCity('');
    }
  };

  const handleCustomCityChange = (e) => {
    setCustomCity(e.target.value);
  };

  const validateForm = () => {
    if (!formData.weight || !formData.height) {
      setError('Пожалуйста, заполните обязательные поля');
      return false;
    }

    const weight = parseInt(formData.weight);
    const height = parseInt(formData.height);

    if (weight < 1) {
      setError('Вес должен быть больше 0 кг');
      return false;
    }

    if (height < 1 || height > 260) {
      setError('Рост должен быть от 1 до 260 см');
      return false;
    }

    const city = formData.city === 'Другой город' && customCity ? customCity : formData.city;
    
    return { weight, height, city: city || null };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const validationResult = validateForm();
    if (!validationResult) return;

    const { weight, height, city } = validationResult;

    setLoading(true);

    try {
      const data = await bmiService.calculateBMI(weight, height, city);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Произошла ошибка при расчете');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ weight: '', height: '', city: '' });
    setCustomCity('');
    setShowCityInput(false);
    setResult(null);
    setError('');
  };

  return (
    <div className="bmi-container">
      <header className="bmi-header">
        <h1>Медицинский Калькулятор ИМТ</h1>
        <p>Рассчитайте индекс массы тела для оценки соответствия роста и веса</p>
      </header>

      <div className="bmi-content">
        <div className="form-section">
          <div className="form-card">
            <h2>Введите данные</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="weight">
                  Вес (кг) *
                </label>
                <input
                  type="number"
                  id="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Введите ваш вес"
                  min="1"
                  required
                />
                <div className="input-hint">Пример: 70</div>
              </div>

              <div className="form-group">
                <label htmlFor="height">
                  Рост (см) *
                </label>
                <input
                  type="number"
                  id="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Введите ваш рост"
                  min="1"
                  max="260"
                  required
                />
                <div className="input-hint">Пример: 175</div>
              </div>

              <div className="form-group">
                <label htmlFor="city">
                  Город проживания (необязательно)
                </label>
                <select
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="city-select"
                >
                  {CITIES.map((city, index) => (
                    <option key={index} value={city}>
                      {city || 'Не указывать'}
                    </option>
                  ))}
                </select>
                <div className="input-hint">
                  Если хотите поучаствовать в анонимном сборе статистики по городам, выберите ваш город
                </div>
              </div>

              {showCityInput && (
                <div className="form-group">
                  <label htmlFor="customCity">
                    Укажите ваш город
                  </label>
                  <input
                    type="text"
                    id="customCity"
                    value={customCity}
                    onChange={handleCustomCityChange}
                    placeholder="Введите название вашего города"
                    maxLength="100"
                  />
                </div>
              )}

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Расчет...' : 'Рассчитать ИМТ'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={handleReset}
                >
                  Сбросить
                </button>
              </div>
            </form>
          </div>

          <div className="info-card">
            <h3>О сборе статистики</h3>
            <p>Указание города помогает нам собирать анонимные статистические данные для исследований в области общественного здоровья. Все данные обезличены и используются только в агрегированном виде.</p>
            <p>Вы можете посмотреть текущую статистику на <a href="/stats">странице статистики</a>.</p>
          </div>
        </div>

        <div className="result-section">
          {result && (
            <div className="result-card">
              <h2>Результат</h2>
              
              <div className="result-main">
                <div className="bmi-value">
                  {result.result.toFixed(1)}
                </div>
                <div className="bmi-label">Индекс массы тела</div>
              </div>

              <div className="conclusion">
                <h3>Заключение:</h3>
                <p>{result.conclusion}</p>
              </div>

              {result.recommendation && (
                <div className="recommendation">
                  <h3>Рекомендация:</h3>
                  <p>{result.recommendation}</p>
                </div>
              )}

              <div className="input-data">
                <h3>Введенные данные:</h3>
                <div className="data-grid">
                  <div className="data-item">
                    <span className="data-label">Вес:</span>
                    <span className="data-value">{formData.weight} кг</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Рост:</span>
                    <span className="data-value">{formData.height} см</span>
                  </div>
                  {formData.city && formData.city !== 'Другой город' && (
                    <div className="data-item">
                      <span className="data-label">Город:</span>
                      <span className="data-value">{formData.city}</span>
                    </div>
                  )}
                  {customCity && (
                    <div className="data-item">
                      <span className="data-label">Город:</span>
                      <span className="data-value">{customCity}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;