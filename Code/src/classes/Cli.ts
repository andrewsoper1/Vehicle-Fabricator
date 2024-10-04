// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";



class Cli {
  
  vehicles: (Car |  Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
        this.vehicles = vehicles;
    }

  
  static generateVin(): string {   
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    }

  
  chooseVehicle(): void {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'selectedVehicleVin',
                message: 'Select a vehicle to perform an action on',
                choices: this.vehicles.map((vehicle) => {
                    return {
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle.vin,
                    };
                }),
            },
        ])
        .then((answers) => {       
            this.selectedVehicleVin = answers.selectedVehicleVin;      
            this.performActions();
        });
    }

  
  createVehicle(): void {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'vehicleType',
                    message: 'Select a vehicle type',         
                    choices: ['Car', 'Truck', 'Motorbike'],
                },
            ])
            .then((answers) => {
                if (answers.vehicleType === 'Car') {
          
                this.createCar();
            } 
             else if (answers.vehicleType === 'Truck') {
                this.createTruck();
            }
            else  {
                this.createMotorbike();
        
            }
        });
    }

  
    createCar(): void {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'color',
                    message: 'Enter Color',
                },
                {
                    type: 'input',
                    name: 'make',
                    message: 'Enter Make',
                },
                {
                    type: 'input',
                    name: 'model',
                    message: 'Enter Model',
                },
                {
                    type: 'input',
                    name: 'year',
                    message: 'Enter Year',
                },
                {
                    type: 'input',
                    name: 'weight',
                    message: 'Enter Weight',
                },
                {
                    type: 'input',
                    name: 'topSpeed',
                    message: 'Enter Top Speed',
                },
            ])
            .then((answers) => {
                const car = new Car(
          
                    Cli.generateVin(),
                answers.color,
                answers.make,
                answers.model,
                parseInt(answers.year),
                parseInt(answers.weight),
                parseInt(answers.topSpeed),
                []
            );
        
            this.vehicles.push(car);
        
            this.selectedVehicleVin = car.vin;
        
            this.performActions();
        });
    }

  
    createTruck(): void {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'color',
                    message: 'Enter Color',
                },
                {
                    type: 'input',
                    name: 'make',
                    message: 'Enter Make',
                },
                {
                    type: 'input',
                    name: 'model',
                    message: 'Enter Model',
                },
                {
                    type: 'input',
                    name: 'year',
                message: 'Enter Year',
                },
                {
                    type: 'input',
                    name: 'weight',
                    message: 'Enter Weight',
                },
                {
                    type: 'input',
                    name: 'topSpeed',
                    message: 'Enter Top Speed',
                },
                {
                    type: 'input',
                    name: 'towingCapacity',
                    message: 'Enter Towing Capacity',
                },
            ])
            .then((answers) => {
        
                const truck = new Truck(
                    Cli.generateVin(),
                    answers.color,
                    answers.make,
                    answers.model,
                    parseInt(answers.year),
                    parseInt(answers.weight),
                    parseInt(answers.topSpeed),
                    [],
                    parseInt(answers.towingCapacity)
          
          
                );
                this.vehicles.push(truck);
                this.selectedVehicleVin = truck.vin;
                this.performActions();
            });
    }

  
    createMotorbike(): void {
            inquirer
                .prompt([
                {
                    type: 'input',
                    name: 'color',
                    message: 'Enter Color',
                },
                {
                    type: 'input',
                    name: 'make',
                    message: 'Enter Make',
                },
                {
                    type: 'input',
                    name: 'model',
                    message: 'Enter Model',
                },
                {
                    type: 'input',
                    name: 'year',
                    message: 'Enter Year',
                },
                {
                    type: 'input',
                    name: 'weight',
                    message: 'Enter Weight',
                },
                {
                    type: 'input',
                    name: 'topSpeed',
                    message: 'Enter Top Speed',
                },
                {
                    type: 'input',
                    name: 'frontWheelDiameter',
                    message: 'Enter Front Wheel Diameter',
                },
                {
                    type: 'input',
                    name: 'frontWheelBrand',
                    message: 'Enter Front Wheel Brand',
                },
                {
                    type: 'input',
                    name: 'rearWheelDiameter',
                    message: 'Enter Rear Wheel Diameter',
                },
                {
                    type: 'input',
                    name: 'rearWheelBrand',
                    message: 'Enter Rear Wheel Brand',
                },
            ])
            .then((answers) => {
        
                const motorbike = new Motorbike(
                    Cli.generateVin(),
                    answers.color,
                    answers.make,
                    answers.model,
                    parseInt(answers.year),
                    parseInt(answers.weight),
                    parseInt(answers.topSpeed),
                    [],
        
                );
                this.vehicles.push(motorbike);
                this.selectedVehicleVin = motorbike.vin;
                this.performActions();
            });
    }

  
    findVehicleToTow(vehicle: Truck): void {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'vehicleToTow',
                    message: 'Select a vehicle to tow',
                    choices: this.vehicles.map((vehicle) => {
                        return {
                            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                            value: vehicle,
                        };
                    }),
                },
            ])
            .then((answers) => {
        
        
                if (answers.vehicleToTow.vin === vehicle.vin) {
                    console.log('The Truck cannot tow itself')
                    this.performActions()
                } else {
                    vehicle.tow(answers.vehicleToTow)
                    this.performActions()
                }
            });
    }

  
    performActions(): void {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Select an action',
                    choices: [
                        'Print details',
                        'Start vehicle',
                        'Accelerate 5 MPH',
                        'Decelerate 5 MPH',
                        'Stop vehicle',
                        'Turn right',
                        'Turn left',
                        'Reverse',
                        'Select or create another vehicle',
                        'Tow',
                        'Wheelie',
                        'Exit',
                    ],
                },
            ])
            .then((answers) => {
                if (answers.action === 'Print details') {
          
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin) {
                            this.vehicles[i].printDetails();
                        }
                    }
                } else if (answers.action === 'Start vehicle') {
          
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin) {
                            this.vehicles[i].start();
                        }
                    }
                } else if (answers.action === 'Accelerate 5 MPH') {
          
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin) {
                                this.vehicles[i].accelerate(5);
                            }
                        }
                } else if (answers.action === 'Decelerate 5 MPH') {
          
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin) {
                            this.vehicles[i].decelerate(5);
                        }
                    }
                } else if (answers.action === 'Stop vehicle') {
          
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin) {
                            this.vehicles[i].stop();
                        }
                    }
                } else if (answers.action === 'Turn right') {
          
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin) {
                            this.vehicles[i].turn('right');
                        }
                    }
                } else if (answers.action === 'Turn left') {
          
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin) {
                            this.vehicles[i].turn('left');
                        }
                    }
                } else if (answers.action === 'Reverse') {
          
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin) {
                            this.vehicles[i].reverse();
                        }
                    }
                } else if (answers.action === 'Tow') {
          
                    for (let i = 0; i < this.vehicles.length; i ++) {
                        if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i] &&  this.vehicles[i] instanceof Truck) {
                        let truck = this.vehicles[i]  as Truck;
                        this.findVehicleToTow(truck)
                    } else {
                            console.log('Only trucks can tow vehicles');
                            this.performActions()
                        }
                    }
                    return              
                } else if (answers.action === 'Wheelie') {
                        for (let i = 0; i < this.vehicles.length; i ++) {
                            if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i] &&  this.vehicles[i] instanceof Motorbike) {
                            let motorbike = this.vehicles[i]  as Motorbike;
                            motorbike.wheelie()
                        } else {
                            console.log('Only motorbikes can do wheelies')
                            this.performActions()
                        }
                    }
                    return

                } else if (answers.action === 'Select or create another vehicle') {
          
                    this.startCli();
                    return;
                } else {
          
                    this.exit = true;
                }
                if (!this.exit) {
          
                    this.performActions();
                }
            });
    }

  
    startCli(): void {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'CreateOrSelect',
                    message:
                        'Would you like to create a new vehicle or perform an action on an existing vehicle?',
                    choices: ['Create a new vehicle', 'Select an existing vehicle'],
                },
            ])
            .then((answers) => {
        
                if (answers.CreateOrSelect === 'Create a new vehicle') {
                    this.createVehicle();
                } else {
                    this.chooseVehicle();
                }
            });
    }
}


export default Cli;
