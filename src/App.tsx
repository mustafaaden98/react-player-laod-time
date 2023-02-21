import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { VidepPlayer } from './VidepPlayer';
import BaseReactPlayer from 'react-player/base';
import { ReactPlayerProps } from 'react-player';
import { useToggle } from 'react-use'

interface IUser {
  id: number;
  name: string;
  age?: number
}

interface IAdminUser extends IUser {
  token: string;
  addNewUser:() => void 
}

function isAdminUser(object: unknown): object is IAdminUser {
  if( object !== null && typeof object === "object") {
    return "token" in object
  }

  return false
}

function isNormalUser(object: unknown): object is IUser {
  if (object !== null && typeof object === "object") {
    return "name" in object
  }
  return false
}


type Species = "cat" | "dog";

interface Pet {
  species: Species
}

class Cat implements Pet {
  public species: Species = "cat";
  public meow(): void {
    console.log('Meow')
  }
  public walking(): void {
    console.log("Cat is Walking");
  }
}

function petIsCat(pet: Pet): pet is Cat {
  return pet.species === "cat"
}

function petIsCatboolean(pet: Pet): boolean {
  return pet.species === 'cat'
  
}

// const p: Pet = new Cat();
// if(petIsCat(p)) {
//   p.meow()
// }

// if(petIsCatboolean(p)) {
//   (p as Cat).meow()
// }

interface Test {
  id: string;
  name: string;
  age: number
}
function test(updatedTest: Partial<Omit<Test, "id">>) {
  // updatedTest.
}

const isNonShareableVideo = (mimeType: string | undefined) => {
  let supportedTypes = ['video/x-flv', 'video/3gpp', '...etc'];
  if (mimeType) {
    return supportedTypes.includes(mimeType)
  }
  return false
}

function identity<T,U>(value: T, message: U) : T {
  console.log('mesasge', message);
  return value
}

class User {
  // static age: number = 29;
  private _age: number = 0;
  get age(): number {
    return this._age;
  }
  set age(value: number) {
    if (value> 0 && value <120) {
      this._age = value;
    }
    else {
      console.log('error')
    }
  }
  name: string;
  constructor(name: string) {
    this.name = name
  }
  static printAge() {
    // console.log(User.age);
  }
  send(message: string) {
    console.log(`${this.name} send a ${message}`);
  }
}

class Person {
  constructor(public name: string) {

  }
  public say(word: string) {
    console.log(`${this.name} says ${word}`);
  }
}

class Developer extends Person {
  constructor(name: string) {
    super(name);
    this.say('Good morning')
  } 
}

interface Cansay {
  say(word: string): void
}
interface Canwalk {
  walk(): void
}

class Test implements Canwalk {
  constructor(public name: string) {
    
  }
  walk() {
    console.log('I can walk')
  }
}

abstract class Abcd {
  constructor(public name: string){}
  abstract say(word: string): void 
}

class B extends Abcd {
  constructor(name: string) {
    super(name)
  }
  say(word: string): void {
    console.log(`${this.name} says ${word}`)
  }
}

function App() {
  // let test = isNonShareableVideo('video/3gp7');
  // const person = new Person('Nafisa');
  // person.say('Hello')
  // const developer = new Developer('Mustafa')
  // console.log('**test', test)
  // const user = new User('Mustafa');
  // user.age = 29
  // console.log('age', user.age)
  // identity<number, string>(1,2)
  // async function fetchUser() {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  //   const user: unknown = await response.json();
  //   if (isAdminUser(user)) { // Typeguard
  //     console.log("Admin", user)
  //   }
  //   if (isNormalUser(user)) {
  //     console.log('normal', user)
  //   }
  // }
  // useEffect(() => {
  //   fetchUser()
  // }, [])
  const [isClicked, setIsClicked] = useToggle(false)
  const playerRef = useRef<BaseReactPlayer<ReactPlayerProps>>(null)
  const videoPlayerProps = {
    playerRef,
    url: 'https://www.youtube.com/watch?v=dTSbcI44QkA',
  }
  return (
    <div className="App">
      <div style={{backgroundColor:'black', padding:'10px'}}>
       <span style={{color:'yellow'}}>Time taken to laod recat-player </span>
      </div>
      <div style={{margin: '10px'}}>
        <button style={{padding:'10px'}} onClick = {() => setIsClicked(!isClicked)}>Click to load video player</button>
      </div>
      {
        isClicked && (
        <div>
          <VidepPlayer {...videoPlayerProps}/>
        </div>)
      }
    </div>
  );
}

export default App;
