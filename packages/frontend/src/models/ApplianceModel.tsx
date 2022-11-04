import { SvgUri } from "react-native-svg";

export class ApplianceModel {

    id: string;
    name: string;
    type: ApplianceType;
    scheduled: Array<ScheduledTime> = [];

    public constructor(id: string, name: string, type: ApplianceType, scheduled: Array<ScheduledTime>) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.scheduled = scheduled;
    }

    public addScheduledTime(time: ScheduledTime) {
        this.scheduled.push(time);
    }

    public hasConflictingTime(time: Number): boolean {
        for (let i = 0; i < this.scheduled.length; ++i) {
            if (this.scheduled[i].startTime <= time && this.scheduled[i].endTime >= time) {
                return true;
            }
        }

        return false;
    }

}

export class ScheduledTime {
    startTime: number;
    endTime: number;

    public constructor(startTime: number, endTime: number) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

export interface ApplianceType {
    getIconAsset(): string;
}

export class WashingMachine implements ApplianceType {
    getIconAsset(): string {
        return "https://cdn.discordapp.com/attachments/852224878185676831/1037821877160259724/washingmachine.svg";
    }
}

export class Dryer implements ApplianceType {
    getIconAsset(): string {
        return "https://cdn.discordapp.com/attachments/852224878185676831/1037821876149432411/dryer.svg";
    }
}

export class Oven implements ApplianceType {
    getIconAsset(): string {
        return "https://cdn.discordapp.com/attachments/852224878185676831/1037821876476575844/oven.svg";
    }
}

export class Stove implements ApplianceType {
    getIconAsset(): string {
        return "https://cdn.discordapp.com/attachments/852224878185676831/1037821876854079539/stove.svg";
    }
}

export class DishWasher implements ApplianceType {
    getIconAsset(): string {
        return "https://cdn.discordapp.com/attachments/852224878185676831/1037821877160259724/washingmachine.svg";
    }
}

export class OtherAppliance implements ApplianceType {
    getIconAsset(): string {
        return "https://cdn.discordapp.com/attachments/852224878185676831/1037821877160259724/washingmachine.svg";
    }
}