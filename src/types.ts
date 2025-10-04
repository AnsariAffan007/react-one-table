type Address = {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string
  postalCode: string;
  state: string;
  stateCode: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  role: string;
  university: string;
  image: string;
  ip: string;
  macAddress: string;
  ein: string;
  ssn: string;
  userAgent: string;

  address: Address;

  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };

  company: Address;

  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };

  hair: {
    color: string;
    type: string;
  };
};
