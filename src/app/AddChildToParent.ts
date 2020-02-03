export class AddChildToParent {
    childId: number;
    parentId: number;
    parentGender: number;
    constructor(parentid: number, parentgender: number, childid: number) {
        this.parentId = parentid;
        this.parentGender = parentgender;
        this.childId = childid;
    }
}
