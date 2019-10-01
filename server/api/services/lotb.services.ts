import Promise from 'bluebird';
import L from '../../common/logger'
import uuid from 'uuidv4';
import data_toons from '../../../data/toons.json';
import data_talismans from '../../../data/talismans.json';


interface Skill {
    name?:string,
    effect?:string,
    effects?:string[]
}

interface Toon {
  id: string,
  class?: string,
  name: string,
  type?: string,
  subtype?: string,
  slots?: string[],
  basic?: Skill | string,
  power?: Skill,
  fury?: Skill,
  passive?: Skill,
  future_basic?: Skill,
  future_power?: Skill,
  past_basic?: Skill,
  past_power?: Skill,
  origin?: string,
  details?: string,
  portrait?: string,
  forum_portrait?: string,
  img?: string,
  thumb?: string,
  backdrop?: string,
  backdrop2?: string,
  stars?: number,
  hp?:number,
  atk?:number,
  def?:number,
  magic?:number,
  mr?:number,
  special?:number,
};

const toons: Toon[] = data_toons.map(item=>{
    return {id:uuid(),...item};
});

export class LotbService {
  all(): Promise<Toon[]> {
    L.info(toons, 'fetch all examples');
    return Promise.resolve(toons);
  }

  byId(id: string): Promise<Toon> {
    L.info(`fetch example with id ${id}`);
    return this.all().then(r => {
        const toon : Toon = r.find(item=>{ return item.id==id});
        return Promise.resolve(toon);
    })
  }

  create(name: string): Promise<Toon> {
    L.info(`create toon with name ${name}`);
    const toon: Toon = {
      id: uuid(),
      name
    };
    toons.push(toon)
    return Promise.resolve(toon);
  }

  delete(id: string): Promise<Toon> {
    L.info(`delete toon with id ${id}`);
    const index=toons.findIndex(item=>{ return item.id==id});
    const toon=toons.find(item=>{ return item.id==id});
    if (!toon) {
        return Promise.resolve(null);
    } else {
        toons.splice(index,1);
        return Promise.resolve(toon);
    }
  }  

  update(id: string,name: string): Promise<Toon> {
    L.info(`update toon identified as ${id} with name ${name}`);
    const index=toons.findIndex(item=>{ return item.id==id});
    const toon=toons.find(item=>{ return item.id==id});
    if (!toon) {
        return Promise.resolve(null);
    } else {
        toon.name=name;
        return Promise.resolve(toon);
    }
  }    
}

export default new LotbService();