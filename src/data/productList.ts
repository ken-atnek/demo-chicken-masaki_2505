/* =======================================
 * 商品一覧
 * URL: src/data/productList.ts
 * Created: 2025-05-28
 * Last updated: 2025-05-28
 * ======================================= */
// import item01 from "@/data/product/item01.webp"
// import item01_02 from "@/data/product/item01-02.jpg"
// import item01_03 from "@/data/product/item01-03.jpg"
// import item02 from "@/data/product/item02.webp"
// import item03 from "@/data/product/item03.webp"
import { StaticImageData } from "next/image";

export type Product ={
  id:string;
  title:string;
  catchCopy:string;
  description?: string;
  price:number;
  unitNote?: string;
  productClassId: string;
  images:StaticImageData[];
}

export async function getProductList(): Promise<Product[]> {
  const res = await fetch('https://demo-chicken-masaki.tuna-pic.co.jp/online-shop/custom-api/products', {
    cache: 'force-cache',
  });
  if (!res.ok) {
    throw new Error('商品一覧の取得に失敗しました');
  }
  return await res.json();
}


/*
export const productList:Product[] =[
  {
    id:'001',
    images:[item01,item01_02,item01_03],
    catchCopy:'昭和時代からの秘伝のタレ、若鶏の丸焼き',
    title:'まさきの丸焼き',
    price:1800,
    description:'丸鶏を醤油ベースのタレに4日間漬け込み、ゆっくり1時間以上かけて焼き上げました。醤油の香ばしい香りとまろやかな風味、比較的さっぱりとした味付けにしております。1966年の販売開始から半世紀以上愛され続けている当店の看板商品です。目安として1羽で大人3名～4名様分です。ご希望により食べやすい大きさにカットいたしますので、お申し付けください。(1羽で12切～14切程になります）<br />アレルゲン(28品目中）小麦・大豆・鶏肉',
  },
  {
    id:'002',
    images:[item02],
    catchCopy:'まさきのにんにく塩（黒こしょう入り',
    title:'あじくらう',
    price:850,
    unitNote: '(100g/1本)',
    description:'天草灘の海水塩と熊本県産のにんにくを使用し、化学調味料を一切使わず、まさきと塩職人が作り上げたこだわりの逸品です。にんにくの風味と黒こしょうのピリッとした食感が癖になるかも。唐揚げ、焼肉、野菜炒め、魚フライ、炒飯など、いろんなお料理にお使いいただける万能調味料です。',
  },
  {
    id:'003',
    images:[item03],
    catchCopy:'まさきのにんにく塩（赤唐辛子入り）',
    title:'うんぶくるる',
    price:850,
    unitNote: '(100g/1本)',
    description:'天草灘の海水塩と熊本県産のにんにくを使用し、化学調味料を一切使わず、まさきと塩職人が作り上げたこだわりの逸品です。にんにくの風味と赤唐辛子の辛みが効いた食感に溺れるかも。唐揚げ、焼肉、野菜炒め、魚フライ、炒飯など、いろんなお料理にお使いいただける万能調味料です。',
  },
]
*/