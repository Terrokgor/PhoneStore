export interface Phone {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
}

export interface PhoneDetail extends Phone {
  description: string;
  storageOptions: StorageOption[];
  colorOptions: ColorOption[];
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}
