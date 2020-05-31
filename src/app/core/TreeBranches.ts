
import {NgModule} from '@angular/core';

@NgModule({})

export class TreeFactoryModule {
    private treeBranch: TreeBranch;
    private treeBranchLength;
    private connectinlines: ConnectingLines;
    private FamilyBranches: Array<TreeBranch>;
    private RunninStartingPoint: number;
    private BranchDartStartingPointXaxis: number;
    private BranchDartStartingPointYaxis: number;
    private lp_Generation: number;
    private lp_PersonId: number;
    private lp_PersonName: string;
    private lp_PersonBirth: Date;
    private lp_PersonDeath: Date;
    private lp_PersonIsMale: boolean;
    private lp_Father: number;
    private lp_Mother: number;
    private lp_Partner: number;
    private lp_ParentConnection: number;
    private lp_ChildConnection: number;
    private lp_Picture: File;
    private rp_Generation: number;
    private rp_PersonId: number;
    private rp_PersonName: string;
    private rp_PersonBirth: Date;
    private rp_PersonDeath: Date;
    private rp_PersonIsMale: boolean;
    private rp_Father: number;
    private rp_Mother: number;
    private rp_Partner: number;
    private rp_ParentConnection: number;
    private rp_ChildConnection: number;
    private rp_Picture: File;

    constructor() {}

    AddTreeBranch(
        BranchDartStartingPointXaxisIn: number,
        BranchDartStartingPointYaxisIn: number,
        lp_Generation_in: number ,
        lp_PersonId_in: number,
        lp_PersonName_in: string,
        lp_PersonBirth_in: Date,
        lp_PersonDeath_in: Date,
        lp_PersonIsMale_in: boolean,
        lp_Father_in: number,
        lp_Mother_in: number,
        lp_Partner_in: number,
        lp_ParentConnection_in: number,
        lp_ChildConnection_in: number,
        lp_Picture_in: File,
        rp_Generation_in: number,
        rp_PersonId_in: number,
        rp_PersonName_in: string,
        rp_PersonBirth_in: Date,
        rp_PersonDeath_in: Date,
        rp_PersonIsMale_in: boolean,
        rp_Father_in: number,
        rp_Mother_in: number,
        rp_Partner_in: number,
        rp_ParentConnection_in: number,
        rp_ChildConnection_in: number,
        rp_Picture_in: File
    ) {
        this.treeBranch = new TreeBranch(
            BranchDartStartingPointXaxisIn,
            BranchDartStartingPointYaxisIn,
            lp_Generation_in,
            lp_PersonId_in,
            lp_PersonName_in,
            lp_PersonBirth_in,
            lp_PersonDeath_in,
            lp_PersonIsMale_in,
            lp_Father_in,
            lp_Mother_in,
            lp_Partner_in,
            lp_ParentConnection_in,
            lp_ChildConnection_in,
            lp_Picture_in,
            rp_Generation_in,
            rp_PersonId_in,
            rp_PersonName_in,
            rp_PersonBirth_in,
            rp_PersonDeath_in,
            rp_PersonIsMale_in,
            rp_Father_in,
            rp_Mother_in,
            rp_Partner_in,
            rp_ParentConnection_in,
            rp_ChildConnection_in,
            rp_Picture_in
        );
        this.treeBranchLength = this.FamilyBranches.push(this.treeBranch);
    }

    GetWidthOfTreeBranch(GenerationIn: number) {}
}


class BranchDart {
    private UpperLeftStartingPoint: number;
    private HorizontalLine: number;
    private LeftVerticalLine: number;
    private LeftfiagonalLine: number;
    private RightdiagonalLine: number;
    private DividerLine: number;
    private LeftPersonsName: Text;
    private LeftPersonsDateOfBirth: Text;
    private LeftPersonsDateOfDeath: Text;
    private LeftPersonPickture: number;
    private RightPersonsName: Text;
    private RightPersonsDateOfBirth: Text;
    private RightPersonsDateOfDeath: Text;
    private RightPersonPickture: number;
    private BranchPolygon: string;

    CreateBranchDart(startXin: number, startYin: number){
        this.BranchPolygon = 'polygon= "' + startXin + '" "' + startYin +
                             '", "' + startXin + '" "' + '" "' + (startYin + 100) +
                             '", "' + (startXin + 50) + '" "' + (startYin + 100) +
                             '", "' + (startXin + 100) + '" "' + (startYin + 50) +
                             '", "' + (startXin + 50) + '" "' + (startYin + 0);
    }
}

class TreeBranch {
    TreeBranchId: number;
    BranchDartStartingPointXaxis: number;
    BranchDartStartingPointYaxis: number;
    BrancheDart: string;
    FatherAndMotherAreAlsoPartners: boolean;
    ChildConnectionIfBothParentsAreAlsoPartners: number;
    lp_Generation: number;
    lp_PersonId: number;
    lp_PersonName: string;
    lp_PersonBirth: Date;
    lp_PersonDeath: Date;
    lp_PersonIsMale: boolean;
    lp_Father: number;
    lp_Mother: number;
    lp_Partner: number;
    lp_ParentConnection: number;
    lp_ChildConnection: number;
    lp_Picture: File;
    rp_Generation: number;
    rp_PersonId: number;
    rp_PersonName: string;
    rp_PersonBirth: Date;
    rp_PersonDeath: Date;
    rp_PersonIsMale: boolean;
    rp_Father: number;
    rp_Mother: number;
    rp_Partner: number;
    rp_ParentConnection: number;
    rp_ChildConnection: number;
    rp_Picture: File;

constructor(
    BranchDartStartingPointXaxisIn: number,
    BranchDartStartingPointYaxisIn: number,
    lp_Generation_in: number ,
    lp_PersonId_in: number,
    lp_PersonName_in: string,
    lp_PersonBirth_in: Date,
    lp_PersonDeath_in: Date,
    lp_PersonIsMale_in: boolean,
    lp_Father_in: number,
    lp_Mother_in: number,
    lp_Partner_in: number,
    lp_ParentConnection_in: number,
    lp_ChildConnection_in: number,
    lp_Picture_in: File,
    rp_Generation_in: number,
    rp_PersonId_in: number,
    rp_PersonName_in: string,
    rp_PersonBirth_in: Date,
    rp_PersonDeath_in: Date,
    rp_PersonIsMale_in: boolean,
    rp_Father_in: number,
    rp_Mother_in: number,
    rp_Partner_in: number,
    rp_ParentConnection_in: number,
    rp_ChildConnection_in: number,
    rp_Picture_in: File
)   {
        this.BranchDartStartingPointXaxis = BranchDartStartingPointXaxisIn;
        this.BranchDartStartingPointYaxis = BranchDartStartingPointYaxisIn;
        this.lp_Generation = lp_Generation_in;
        this.lp_PersonId =  lp_PersonId_in;
        this.lp_PersonName =  lp_PersonName_in;
        this.lp_PersonBirth =  lp_PersonBirth_in;
        this.lp_PersonDeath =  lp_PersonDeath_in;
        this.lp_PersonIsMale =  lp_PersonIsMale_in;
        this.lp_Father = lp_Father_in;
        this.lp_Mother =  lp_Mother_in;
        this.lp_Partner = lp_Partner_in;
        this.lp_ParentConnection =  lp_ParentConnection_in;
        this.lp_ChildConnection =  lp_ChildConnection_in;
        this.lp_Picture =  lp_Picture_in;
        this.rp_Generation =  rp_Generation_in;
        this.rp_PersonId = rp_PersonId_in;
        this.rp_PersonName =  rp_PersonName_in;
        this.rp_PersonBirth =  rp_PersonBirth_in;
        this.rp_PersonDeath = rp_PersonDeath_in;
        this.rp_PersonIsMale =  rp_PersonIsMale_in;
        this.rp_Father =  rp_Father_in;
        this.rp_Mother = rp_Mother_in;
        this.rp_Partner = rp_Partner_in;
        this.rp_ParentConnection = rp_ParentConnection_in;
        this.rp_ChildConnection =  rp_ChildConnection_in;
        this.rp_Picture = rp_Picture_in;
    }

    SetNewConnectionPoint(lp_ChildConnectionIn: number,
                            lp_ParentConnection_in: number,
                            rp_ChildConnection_in: number,
                            rp_ParentConnection_in: number,
                            ChildConnectionIfBothParentsAreAlsoPartnersIn: number
                            ) {
                                console.log('Hier verder');
                            }
}

class ConnectingLines {
    LineId: number;
    StartingTreeBranchId: number;
    EndingTreeBranchId: number;
    StartingPointOfLine: number;
    EndPointOfLine: number;
    constructor( LineIdIn: number,
        StartingTreeBranchIdIn: number,
        EndingTreeBranchIdIn: number,
        StartingPointOfLineIn: number,
        EndPointOfLineIn: number,
    ) {
        this.StartingTreeBranchId = StartingTreeBranchIdIn;
        this.EndingTreeBranchId = EndingTreeBranchIdIn;
        this.StartingPointOfLine = StartingPointOfLineIn;
        this.StartingPointOfLine = EndPointOfLineIn;
    }
}