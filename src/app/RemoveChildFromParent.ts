export class RemoveChildFromParent {
    childId: number;
    parentId: number;
    constructor(childid: number, parentid: number ) {
        this.parentId = parentid;
        this.childId = childid;
    }
}
