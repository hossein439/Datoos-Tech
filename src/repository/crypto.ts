import HttpClientManager from "@/clients/http/helpers/manager.helper";
import { PAGINATION } from "@/constants/shared/pagination.constant";

class CryptoRepository {
  httpClient: any;
  static #instance: CryptoRepository;
  readonly CRYPTO: string = "/api/cryptocurrency";

  private constructor() {
    this.httpClient = HttpClientManager.getInstance();
  }

  public static getInstance(): CryptoRepository {
    if (!CryptoRepository.#instance) {
      CryptoRepository.#instance = new CryptoRepository();
    }

    return CryptoRepository.#instance;
  }

  getList(params) {
    const { start = PAGINATION.start, limit = PAGINATION.limit } = params;
    return this.httpClient(
      `${this.CRYPTO}/listing?start=${start}&limit=${limit}&sortBy=rank&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap`,
      {
        method: "get",
      }
    );
  }
}

export default CryptoRepository;
