export class AddChildToParent {
    ChildId: number;
    ParentId: number;
    ParentGender: number;
    constructor(parentid: number, parentgender: number, childid: number) {
        this.ParentId = parentid;
        this.ParentGender = parentgender;
        this.ChildId = childid;
    }
}
