import CryptoRepository from "@/repository/crypto";

class CryptoService {
  static #instance: CryptoService;
  private readonly repository;

  private constructor() {
    this.repository = CryptoRepository.getInstance();
  }

  public static getInstance(): CryptoService {
    if (!CryptoService.#instance) {
      CryptoService.#instance = new CryptoService();
    }

    return CryptoService.#instance;
  }

  getList(params) {
    return this.repository.getList(params);
  }
}

export default CryptoService;
