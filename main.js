const totalCountries = 12;

const countryContainer = document.querySelector('.country-container');

const search = document.querySelector('search');

const searchBtn = document.querySelector('.searchBtn');
const searchInput = document.querySelector('.searchInput');

const searchWrapper = document.querySelector('.search-wrapper');
searchBtn.addEventListener('click', () => {
  // Eğer input kapalı ise aç
  if (!searchWrapper.classList.contains('active')) {
    searchWrapper.classList.add('active');
    searchInput.focus(); // focus input'a
  } else {
    // Input açık ise arama işlemi
    const query = searchInput.value.trim();
    if (query) {
      console.log('Arama yapılacak:', query);
      // Burada API veya filtreleme işlemi yapılabilir
    }
    // Inputu kapat ve dürbünü ortaya getir
    searchWrapper.classList.remove('active');
    searchInput.value = ''; // input temizlenebilir, isteğe bağlı
  }
});

searchInput.addEventListener('input', (e) => {
  const searchValue = searchInput.value.toLowerCase();
  const CountryNames = document.querySelectorAll('.country-name');

  CountryNames.forEach((countryName) => {
    countryName.parentElement.parentElement.style.display = 'block';
    if (!countryName.innerHTML.toLowerCase().includes(searchValue)) {
      countryName.parentElement.parentElement.style.display = 'none';
    }
  });
});

// 12 ülkeyi çek
async function loadCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population'
    );
    if (!res.ok) throw new Error('API isteği başarısız');

    const countries = await res.json();

    // İlk 12 ülkeyi al
    const selectedCountries = countries.slice(0, 12);

    countryContainer.innerHTML = ''; // Önceki içerik varsa temizle

    selectedCountries.forEach((country, index) => {
      const flag = country.flags?.png || 'images/default.png';
      const name = country.name?.common || 'Bilinmiyor';
      const capital = country.capital?.[0] || 'Bilinmiyor';
      const region = country.region || 'Bilinmiyor';
      const population = country.population?.toLocaleString() || 'Bilinmiyor';

      const countryCard = document.createElement('div');
      countryCard.classList.add('country');

      countryCard.innerHTML = `
        <div class="image-container">
          <img src="${flag}" alt="${name} Bayrağı" class="country-flag" width="150">
        </div>
        <div class="country-info">
          <span class="country-id">#${String(index + 1).padStart(3, '0')}</span>
          <h3 class="country-name">${name}</h3>
          <div class="small">
            <small class="country-capital"><i class="fa-solid fa-city"></i> ${capital}</small>
            <small class="country-region"><i class="fa-solid fa-earth-americas"></i> ${region}</small>
            <small class="country-population"><i class="fa-solid fa-users"></i> ${population}</small>
          </div>
        </div>
      `;

      countryContainer.appendChild(countryCard);
    });
  } catch (err) {
    console.error('API hatası:', err);
  }
}

loadCountries();
