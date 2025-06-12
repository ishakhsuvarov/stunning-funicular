import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';


import ProductList from '@/plp/containers/ProductList.js';
import Facets from '@/plp/containers/Facets.js';
import ResultsInfo from '@/plp/containers/ResultsInfo.js';
import SearchBarInput from '@/plp/containers/SearchBarInput.js';
import SearchBarResults from '@/plp/containers/SearchBarResults.js';
import { render as provider } from '@/plp/render.js';

// Initializers
import '../../scripts/initializers/search.js';

export default async function decorate(block) {
  const config = readBlockConfig(block);

  console.log('custom product list page');

  const fragment = document.createRange().createContextualFragment(`
    <div class="search__input"></div>
    <div class="search__wrapper">
      <div class="search__left-column">
        <div class="search__result-info"></div>
        <div class="search__facets"></div>
      </div>
      <div class="search__right-column">
        <div class="search__product-list"></div>
      </div>
    </div>
  `);

  const $input = fragment.querySelector('.search__input');
  const $resultInfo = fragment.querySelector('.search__result-info');
  const $facets = fragment.querySelector('.search__facets');
  const $productList = fragment.querySelector('.search__product-list');

  block.innerHTML = '';
  block.appendChild(fragment);
  console.log('PLP BLOCK INITILIZATION');

  const storeDetails = {

  };
  
  return await Promise.all([

    provider.render(ResultsInfo, { storeDetails })($resultInfo),
    provider.render(Facets, { storeDetails })($facets),
    provider.render(ProductList, { storeDetails })($productList),
  ]);
}
