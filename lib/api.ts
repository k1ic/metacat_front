// https://www.metacat.world/api/v1/get_cv_parcel_list?page=2&count=50&query=&type=gallery
import * as qs from 'qs';

class API {
  private url: string;

  private key?: string;

  constructor(url: string, key?: string) {
    this.url = url;
    this.key = key;
  }

  public async getCVParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
    const url = `${this.url}/get_cv_parcel_list${search}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCVEventList(cursor: number, count: number): Promise<any> {
    const search = qs.stringify({ count, cursor }, { addQueryPrefix: true });
    const url = `${this.url}/get_cv_event_list${search}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getDCLEventList(cursor: number, count: number): Promise<any> {
    const search = qs.stringify({ count, cursor }, { addQueryPrefix: true });
    const url = `${this.url}/get_dcl_event_list${search}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }
  public async getDCLParcelList(
    page: number,
    count: number,
    query: string,
    type: string,
  ): Promise<any> {
    const search = qs.stringify({ page, count, query, type }, { addQueryPrefix: true });
    const url = `${this.url}/get_dcl_parcel_list${search}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }

  public async getCarouseList(): Promise<any> {
    const url = `${this.url}/get_carousel_list`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  }
}

export default new API('https://www.metacat.world/api/v1');
