export class Person {
    constructor(){}
    PersonId: number;
    PersonGivvenName: string;
    PersonFamilyName: string;
    PersonDateOfBirth: Date;
    PersonPlaceOfBirth: string;
    PersonDateOfDeath: Date;
    PersonPlaceOfDeath: string;
    PersonIsMale: boolean;
    MotherID: number;
    MotherName: string;
    FatherID: number;
    FatherName: string;
    PartnerID: number;
    PartnerName: string;
    Timestamp: Date;
    FatherAndMotherArePartners?: boolean;
}