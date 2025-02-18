import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Chart from './chart';
import 'swiper/css';
import 'swiper/css/pagination';
import { Period } from '../types/chart';
import {
  dailyCalorieData,
  weeklyCalorieData,
  monthlyCalorieData,
  dailyWeightData,
  weeklyWeightData,
  monthlyWeightData,
} from '../data/chart_data';

const CalorieChart: React.FC = () => {
  const [caloriePeriod, setCaloriePeriod] = useState<Period>('daily');
  const [weightPeriod, setWeightPeriod] = useState<Period>('daily');

  const getCalorieData = () => {
    switch (caloriePeriod) {
      case 'daily':
        return dailyCalorieData;
      case 'weekly':
        return weeklyCalorieData;
      case 'monthly':
        return monthlyCalorieData;
    }
  };

  const getWeightData = () => {
    switch (weightPeriod) {
      case 'daily':
        return dailyWeightData;
      case 'weekly':
        return weeklyWeightData;
      case 'monthly':
        return monthlyWeightData;
    }
  };

  const getCalorieTitle = () => {
    switch (caloriePeriod) {
      case 'daily':
        return 'Harian';
      case 'weekly':
        return 'Mingguan';
      case 'monthly':
        return 'Bulanan';
    }
  };

  const getWeightTitle = () => {
    switch (weightPeriod) {
      case 'daily':
        return 'Harian';
      case 'weekly':
        return 'Mingguan';
      case 'monthly':
        return 'Bulanan';
    }
  };

  return (
    <div className="relative pb-8">
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        className="w-full"
      >
        <SwiperSlide>
          <div className="px-4">
            <Chart
              title={`Kalori ${getCalorieTitle()}`}
              data={getCalorieData()}
              period={caloriePeriod}
              onPeriodChange={setCaloriePeriod}
              metricKey="calories"
              metricLabel="Kalori"
              metricColor="#53C2C6"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-4">
            <Chart
              title={`Berat ${getWeightTitle()}`}
              data={getWeightData()}
              period={weightPeriod}
              onPeriodChange={setWeightPeriod}
              metricKey="weight"
              metricLabel="Berat"
              metricColor="#53C2C6"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CalorieChart;