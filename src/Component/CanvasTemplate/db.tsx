// import { DesignCanvas, Mockup } from "./models";

export class Mockup {
  id: number;
  imgUrl: string;
  side: string;
  constructor(imgUrl: string, side: string, id: number) {
    this.id = id;
    this.imgUrl = imgUrl;
    this.side = side;
  }
}

export class DesignCanvas {
  imgUrl: string;
  side: string;
  mockupId: number;
  constructor(imgUrl: string, side: string, mockupId: number) {
    this.imgUrl = imgUrl;
    this.side = side;
    this.mockupId = mockupId;
  }
}


const m1 = new Mockup("/white-realistic-a5-notebook-closed-600nw-1556581460.webp", "front", 1);
// const m2 = new Mockup("/back.jpeg", "back", 2);

const canvases = [
  new DesignCanvas("/white-realistic-a5-notebook-closed-600nw-1556581460.webp", "front", m1.id),
  //   new DesignCanvas("/back.jpeg", "back", m2.id)
];

const mockups = [m1];

const db = {
  mockups,
  canvases
};

export default db;
