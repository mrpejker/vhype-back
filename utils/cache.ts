interface CacheItem<T> {
  value: T;
  expiry: number;
}

class Cache<T> {
  private cache: { [key: string]: CacheItem<T> } = {};
  private readonly defaultTtl: number;

  constructor(defaultTtl: number = 60 * 60 * 1000) {
    this.defaultTtl = defaultTtl;
  }

  public get(key: string): T | undefined {
    const item = this.cache[key];
    if (!item) {
      return undefined;
    }
    if (item.expiry < Date.now()) {
      delete this.cache[key];
      return undefined;
    }
    return item.value;
  }

  public set(key: string, value: T, ttl: number = this.defaultTtl): void {
    this.cache[key] = {
      value,
      expiry: Date.now() + ttl,
    };
  }

  public remove(key: string): void {
    delete this.cache[key];
  }
}

export default Cache;
