//Створити такі класи:
// 1) Депутат
//    - імя
//    - вік
//    - стать
//    - ступінь чесності (0-100)
//    - мінімальна сума хабаря

import {EGender} from "./enums/gender";
import {IDelegate} from "./models/delegate";
import {IGroup} from "./models/group";
import {IRada} from "./models/rada";

class Delegate {
    public name: string;
    public age: number;
    public gender: EGender;
    public honesty: number;
    public minBribe: number;

    constructor(name: string, age: number, gender: EGender, honesty: number, minBribe?: number) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.honesty = honesty;
        this.minBribe = minBribe;
    }

    public giveBribe = (bribe: number): void => {
        if (bribe < this.minBribe || this.honesty >= 50){
            console.log(`Депутат ${this.name} НЕ взяв хабар!\n---------`);
            return;
        }

        if (bribe < this.minBribe + this.minBribe * this.honesty / 100){
            console.log( `Депутат ${this.name} вагається брати хабар.\n---------`);
            return;
        }

        console.log( `Депутат ${this.name} взяв хабар у розмірі $${bribe} !\n---------`);
    }
}

const petro: IDelegate = new Delegate('Petro', 34, EGender.MALE, 60);
const ivan: IDelegate = new Delegate('Ivan', 45, EGender.MALE, 10, 5000);
const nina: IDelegate = new Delegate('Nina', 28, EGender.FEMALE, 32, 24000);
const alex: IDelegate = new Delegate('Alex', 51, EGender.MALE, 45, 2500);
const ira: IDelegate = new Delegate('Ira', 39, EGender.FEMALE, 73);
const stepan: IDelegate = new Delegate('Stepan', 42, EGender.MALE, 4, 500);
const galyna: IDelegate = new Delegate('Galyna', 32, EGender.FEMALE, 78);
const vova: IDelegate = new Delegate('Vova', 56, EGender.MALE, 49, 3000);

//даєм хабарі депутатам
galyna.giveBribe(5650);
stepan.giveBribe(600);
nina.giveBribe(24020);
alex.giveBribe(2000);
vova.giveBribe(6000);

// 2) Партія
//    - назва
//    - голова (Депутат)
//    - члени партії (Масив депатутатів)

class Group {
    public name: string;
    public chairman: IDelegate;
    public members: Array<IDelegate>;

    constructor(name: string, chairman: IDelegate, members: Array<IDelegate>) {
        this.name = name;
        this.chairman = chairman;
        this.members = members;
    }

    public addDelegate = (delegate: IDelegate): void => {
        this.members.push(delegate);
    }

    public deleteDelegate = (delegateName: string): void => {
        this.members = this.members.filter(({name}) => name !== delegateName);
    }

    public showAllMembers = (): void => {
        console.log(`Депутати партії < ${this.name} > :`);
        this.members.map(({name, age, honesty}) => console.log(`${name} - вік: ${age}  - чесність: ${honesty}`))
        console.log('---------------------------');
    }

    public showBribeTakers = (): void => {
        console.log(`Хабарники партії < ${this.name} > :`);
        this.members
            .filter(({honesty}) => honesty < 50)
            .forEach(({name, honesty}) => console.log(`${name} - (${honesty})`));
        console.log('---------------------------');
    }

    public showTheBiggerBribeTaker = (): void => {
        const theBiggerBribeTaker: IDelegate = this.members.sort((a, b) => a.honesty - b.honesty)[0];
        console.log(`Найбільший хабарник в партії < ${this.name} > : ${theBiggerBribeTaker.name} (${theBiggerBribeTaker.honesty})`);
        console.log('------------')
    }

}

const forLife: IGroup = new Group('За життя', vova, [vova, galyna, stepan]);
const freedom: IGroup = new Group('Свобода', petro, [petro, alex]);
const yourChoice: IGroup = new Group('Твій вибір', nina, [nina, ivan, ira]);

//всі і найбільший хабарник партії За життя
forLife.showBribeTakers();
forLife.showTheBiggerBribeTaker();

//всі  хабарники партії Свобода
freedom.showBribeTakers();

//всі і найбільший хабарник партії Твій вибір
yourChoice.showBribeTakers();
yourChoice.showTheBiggerBribeTaker();

freedom.showAllMembers();

// додаємо новго депутата Романа
const roman: IDelegate = new Delegate('Roman', 37, EGender.MALE, 82, 43000);
freedom.addDelegate(roman);

freedom.showAllMembers();

// виганяємо старого депутата Алекса
freedom.deleteDelegate(alex.name);

freedom.showAllMembers();


// 3) Верхрвна рада
//    - масив партій
//    - решті полів на вибір

class VerkhovnaRada {
    public groups: Array<IGroup>;

    constructor(groups: Array<IGroup>) {
        this.groups = groups
    }

    public addGroup = (group: IGroup): void => {
        this.groups.push(group);
    }

    public deleteGroup = (groupName: string): void => {
        this.groups = this.groups.filter(({name}) => name !== groupName);
    }

    public showAllGroups = (): void => {
        console.log('------------------------------\n Партії Верховної Ради: ')
        this.groups.forEach(({name, chairman}) => {
            console.log(`Партія < ${name} > . Голова: ${chairman.name}`);
        });
    }

    public showGroup = (groupName: string): void => {
        const group: IGroup = this.groups.filter(({name}) => name === groupName)[0];
        console.log(group.name, group.chairman, group.members)
    }

    public showTheTotalBiggerBribeTaker = (): void => {
        const totalBribeTaker: IDelegate = this.groups
            .map((group) => group.members.sort((a, b) => a.honesty - b.honesty)[0])
            .sort((a, b) => a.honesty - b.honesty)[0];

        console.log(`-----------\nНайбільший хабарник Верховної Ради: ${totalBribeTaker.name}`);
    }
}

const ukraineVerkhovnaRada: IRada = new VerkhovnaRada([freedom, forLife, yourChoice]);

// всі партії
ukraineVerkhovnaRada.showAllGroups();

// найбільший хабарник в Раді
ukraineVerkhovnaRada.showTheTotalBiggerBribeTaker();

// виганяємо партію За життя
ukraineVerkhovnaRada.deleteGroup(forLife.name);
ukraineVerkhovnaRada.showAllGroups();

// створюєм новий депутатів
const anton:IDelegate = new Delegate('Anton', 49, EGender.MALE, 86);
const alona:IDelegate = new Delegate('Alona', 27, EGender.FEMALE, 34, 9000);

// нову партію Тільки вперед
const onlyForward: IGroup = new Group('Тільки вперед', anton, [anton,alona]);

// додаєм партію Тільки вперед в Раду
ukraineVerkhovnaRada.addGroup(onlyForward);
ukraineVerkhovnaRada.showAllGroups();

// Мають бути присутні такі можливості:
// - додати\видалити фракцію -
// - вивести всі фракції -
// - вивести конкретну фракцію -
// - додати\видалити депутата з фракції -
// - вивести всіх хабарників фракції -
// - вивести найбільшого хабарника у фрації-
// - вивести найбільшого хабарника верховної ради -
// - вивести фсіх депутатів фракції -
// - спробувати дати взятку. Чим чесніший депутат тим склідніше дати йому хабаря.
// Дача хабаря має мати 3 стани
// - не успішна
// - успішна
// - вгається

// Якщо сума взяти менша за мінімальку, тоді хабарь дати не можливо
// Сума при якій депутат перестає вагатись рівна "мінімальна сума * % чесності".
// Тобто, якщо депутат чесний на 10% і сума взяти рівна 1000, а видаєте 1200, то депатут перестає вагатись,
// та бере хабар.
// Але якщо при таких самих усовах хабар складає 1050, то він буде вагатись.
//
// !!! Хабарником рахується людина, в якої рівень чесності нижчий за 50 !!!