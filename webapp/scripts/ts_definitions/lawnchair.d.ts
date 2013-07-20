
interface ILawnchairOptions {
	record?: any;
	name?: string;
	adapter?: string;
}

declare class Lawnchair {
	constructor(options: ILawnchairOptions, callback: (inst: Lawnchair) => void);
	
    save(obj: any, callback?: (obj: any) => void): Lawnchair;
    batch(objs: any[], callback: (objs: any[]) => void): Lawnchair;
    
    get(obj: string, callback?: (obj: any) => void): Lawnchair;
    get(obj: string[], callback?: (obj: any[]) => void): Lawnchair;

    remove(obj: string, callback?: (t) => void): Lawnchair;
    remove(obj: string[], callback?: () => void): Lawnchair;
    
    all(callback: (obj: any[]) => void): Lawnchair;
    each(callback: (obj: any, index: number) => void): Lawnchair;

    exists(obj: string, callback: (exists: bool) => void): Lawnchair;

    keys(callback: (keys: string[]) => void): Lawnchair;

    nuke(callback: () => void): Lawnchair;
}