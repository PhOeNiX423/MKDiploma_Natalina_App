/**
 * Newsletter.js
 * 
 * Компонент секции подписки на рассылку.
 * 
 * Функциональность:
 * - Отображает заголовок и форму ввода e-mail для подписки
 * - Используется на главной странице как декоративный и вовлекающий блок
 * - На экранах `md` и выше отображается; скрыт на мобильных (`hidden md:block`)
 * 
 * Структура:
 * - Заголовок и подзаголовок с тематикой ухода за кожей
 * - Иконка письма (IoMdMail) встроена в поле ввода
 * - Форма ввода e-mail + кнопка «Подписаться»
 * 
 * Особенности:
 * - Адаптивный дизайн с выравниванием по центру
 * - Стильный внешний вид с розовой цветовой схемой и закруглёнными элементами
 * - Пока не подключена к реальному функционалу (нет обработки `onSubmit`)
 */

import React from "react";

import { IoMdMail } from "react-icons/io";

const Newsletter = () => {
  return (
    <section className="hidden md:block bg-pinksecondary text-white rounded-3xl px-6 py-14 md:px-10 md:py-16">
      <div className="text-center">
        {/* Заголовок */}
        <p className="text-sm tracking-widest uppercase mb-6 md:mb-4 text-pinkaccent font-semibold">
        Узнавай первой о секретах ухода
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 leading-snug md:leading-snug">
          Твоя самая полезная рассылка по красоте и уходу за кожей
        </h2>

        {/* Форма */}
        <form className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="relative w-full md:w-3/5">
            <IoMdMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pinkaccent text-xl" />
            <input
              type="email"
              placeholder="e-mail"
              className="w-full pl-10 pr-4 py-3 rounded-full text-black placeholder-gray-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-pinkaccent text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-800 transition-colors"
          >
            Подписаться
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
