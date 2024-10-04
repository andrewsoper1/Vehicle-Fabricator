
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

class Truck extends Vehicle implements AbleToTow{

 
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  

  
  constructor(
        vin: string,
        color: string,
        make: string,
        model: string,
        year: number,
        weight: number,
        topSpeed: number,
        wheels: Wheel[],
        towingCapacity: number
    ) {
        super();
        this.vin = vin;
        this.color = color;
        this.make = make;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.topSpeed = topSpeed;
        if  (wheels.length !== 4) {
            this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
        } else {
            this.wheels = wheels;
        }
        this.towingCapacity = towingCapacity;     
    }
  
    tow(vehicle: Truck | Motorbike | Car): void {  
        if (vehicle.weight <=  this.towingCapacity) {
            console.log(`${vehicle.make} ${vehicle.model} is being towed!`)

        } else {
            console.log(`${vehicle.make} ${vehicle.model} is too heavy to be towed!`)
        }
    }
    
    override printDetails (): void {
        super.printDetails();
        console.log(`VIN: ${this.vin}`);
        console.log(`Color: ${this.color}`);
        console.log(`Make: ${this.make}`);
        console.log(`Model: ${this.model}`);
        console.log(`Year: ${this.year}`);
        console.log(`Weight: ${this.weight} lbs`);
        console.log(`Top Speed: ${this.topSpeed} mph`);

        console.log(
            `Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand}`
        );
        console.log(
            `Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand}`
        );
        console.log(
            `Wheel 3: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand}`
        );
        console.log(
            `Wheel 4: ${this.wheels[3].getDiameter} inch with a ${this.wheels[3].getTireBrand}`
        );
        console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    }
}


export default Truck;
