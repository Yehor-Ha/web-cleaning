import { useState } from 'react';
import beforeAfter from './assets/before-after.webp';
import masterp from './assets/masterpic.webp';

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  const getLang = (): 'en' | 'pl' | 'ua' => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('lang') as 'en' | 'pl' | 'ua') || 'pl';
  };

  const lang = getLang();

  const translations = {
    en: {
      callNow: 'Call now',
      heroTitle: 'Professional upholstery cleaning at home',
      heroText: 'We remove stains, odors and dust with same-day service.',
      order: 'Book cleaning',
      price: 'Check prices',
      pricesTitle: 'Prices',
      prices: [
        'Sofa — from 600 zl',
        'Mattress — from 400 zl',
        'Armchair — from 250 zl',
      ],
      masterTitle: 'Your cleaning specialist',
      masterText1:
        'More than 5 years of experience in professional cleaning of sofas, mattresses and carpets.',
      masterText2:
        'We use safe products and powerful equipment to remove stains, odors and bacteria.',
      finalTitle: 'Leave a request',
      finalText: 'We will call you back within 5–15 minutes.',
      finalBtn: 'Send request',
      successTitle: 'Thank you for your request!',
      successText: 'We will contact you within 5–15 minutes.',
      namePlaceholder: 'Your name',
      phonePlaceholder: 'Phone number',
      messagePlaceholder: 'What needs cleaning?',
      close: 'Close',
    },

    pl: {
      callNow: 'Zadzwoń teraz',
      heroTitle: 'Profesjonalne pranie mebli w domu',
      heroText: 'Usuwamy plamy, zapachy i kurz tego samego dnia.',
      order: 'Zamów czyszczenie',
      price: 'Sprawdź cenę',
      pricesTitle: 'Cennik',
      prices: ['Sofa — od 600 zl', 'Materac — od 400 zl', 'Fotel — od 250 zl'],
      masterTitle: 'Twój specjalista od czyszczenia',
      masterText1:
        'Ponad 5 lat doświadczenia w profesjonalnym czyszczeniu mebli, materacy i dywanów.',
      masterText2: 'Używamy bezpiecznych środków i profesjonalnego sprzętu.',
      finalTitle: 'Zostaw zgłoszenie',
      finalText: 'Oddzwonimy w ciągu 5–15 minut.',
      finalBtn: 'Wyślij zgłoszenie',
      successTitle: 'Dziękujemy za zgłoszenie!',
      successText: 'Skontaktujemy się z Tobą w ciągu 5–15 minut.',
      namePlaceholder: 'Twoje imię',
      phonePlaceholder: 'Telefon',
      messagePlaceholder: 'Co trzeba wyczyścić?',
      close: 'Zamknij',
    },

    ua: {
      callNow: 'Зателефонувати',
      heroTitle: 'Професійна хімчистка меблів вдома',
      heroText: 'Видаляємо плями, запахи та пил у день звернення.',
      order: 'Замовити чистку',
      price: 'Дізнатися ціну',
      pricesTitle: 'Ціни',
      prices: [
        'Диван — від 600 zl',
        'Матрац — від 400 zl',
        'Крісло — від 250 zl',
      ],
      masterTitle: 'Ваш майстер з хімчистки',
      masterText1:
        'Понад 5 років досвіду у професійній хімчистці меблів, матраців і килимів.',
      masterText2: 'Використовуємо безпечні засоби та професійне обладнання.',
      finalTitle: 'Залиште заявку',
      finalText: 'Ми передзвонимо за 5–15 хвилин.',
      finalBtn: 'Надіслати заявку',
      successTitle: 'Дякуємо за заявку!',
      successText: 'Ми зв’яжемося з вами протягом 5–15 хвилин.',
      namePlaceholder: 'Ваше ім’я',
      phonePlaceholder: 'Телефон',
      messagePlaceholder: 'Що потрібно почистити?',
      close: 'Закрити',
    },
  };

  const t = translations[lang];

  const changeLang = (next: 'en' | 'pl' | 'ua') => {
    window.location.search = `?lang=${next}`;
  };

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const scrollToPrices = () => {
    document.getElementById('prices')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append('access_key', '6575a58a-a585-4cdc-ba0d-104498805410');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setSubmitted(true);
      form.reset();
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {submitted && (
        <div
          onClick={() => setSubmitted(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold">{t.successTitle}</h2>

            <p className="text-slate-600 mt-3">{t.successText}</p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 w-full rounded-2xl bg-slate-900 text-white px-6 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      <header className="shadow-md bg-[#1f5d8c] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-lg md:text-xl font-bold">CleanPro</div>

            <div className="flex gap-2 text-xs md:text-sm">
              {['en', 'pl', 'ua'].map((l) => (
                <button
                  key={l}
                  onClick={() => changeLang(l as 'en' | 'pl' | 'ua')}
                  className="px-2 py-1 rounded border uppercase cursor-pointer hover:bg-slate-100 transition-all duration-200"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <a
            href="tel:+4511122233"
            className="rounded-2xl bg-slate-900 text-white px-4 md:px-5 py-2 text-sm md:text-base shadow hover:bg-slate-800 transition-all duration-200"
          >
            {t.callNow}
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t.heroTitle}
          </h1>
          <p className="mt-6 text-lg text-slate-600">{t.heroText}</p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={scrollToForm}
              className="rounded-2xl bg-slate-900 text-white px-6 py-3 shadow-lg cursor-pointer hover:bg-slate-800 transition-all duration-200"
            >
              {t.order}
            </button>

            <button
              onClick={scrollToPrices}
              className="rounded-2xl border px-6 py-3 cursor-pointer hover:bg-slate-50 transition-all duration-200"
            >
              {t.price}
            </button>
          </div>
        </div>

        <img
          src={beforeAfter}
          alt="До и после чистки"
          className="rounded-3xl w-full h-auto shadow-md"
        />
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="bg-slate-100 rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <img
            src={masterp}
            alt="Мастер по химчистке"
            className="rounded-3xl w-full h-auto shadow-md"
          />

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{t.masterTitle}</h2>

            <p className="mt-4 text-slate-600 leading-7 md:leading-8">
              {t.masterText1}
            </p>

            <p className="mt-4 text-slate-600 leading-7 md:leading-8">
              {t.masterText2}
            </p>
          </div>
        </div>
      </section>

      <section id="prices" className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">{t.pricesTitle}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {t.prices.map((price) => (
              <div
                key={price}
                className="rounded-3xl border p-6 hover:shadow-md transition-all duration-200"
              >
                {price}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 pt-16">
        <div className="rounded-3xl bg-slate-100 p-10 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold">{t.finalTitle}</h3>
            <p className="text-slate-600 mt-2">{t.finalText}</p>
          </div>

          <form
            id="lead-form"
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 border shadow-sm space-y-4"
          >
            <input
              type="text"
              name="name"
              required
              placeholder={t.namePlaceholder}
              className="w-full rounded-2xl border px-4 py-3"
            />

            <input
              type="tel"
              name="phone"
              required
              placeholder={t.phonePlaceholder}
              className="w-full rounded-2xl border px-4 py-3"
            />

            <textarea
              name="message"
              required
              placeholder={t.messagePlaceholder}
              className="w-full rounded-2xl border px-4 py-3 min-h-28"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 text-white px-6 py-3 cursor-pointer hover:bg-slate-800 transition-all duration-200"
            >
              {t.finalBtn}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
