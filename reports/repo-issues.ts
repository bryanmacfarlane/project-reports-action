import {IssueSummary} from '../interfaces';
import * as rptLib from '../project-reports-lib';
const tablemark = require('tablemark')
import * as os from 'os';

let clone = require('clone');

const reportType = 'repo';
export {reportType};

/*
 * Gives visibility into whether the team has untriaged debt, an approval bottleneck and 
 * how focused the team is (e.g. how many efforts are going on)
 * A wip is a work in progress unit of resourcing.  e.g. it may be one developer or it might mean 4 developers.
 */
export function getDefaultConfiguration(): any {
    return <any>{
        "breakdown-by-labels": ['bug', 'security', 'documentation']
    };
}

export interface IssueLabelBreakdown {
    identifier: number, 
    issues: {[label: string]: IssueSummary[]}
};

function getDrillName(label: string, identifier: number): string {
    return `issues-${label}-${identifier}`.replace(" ", "-");
}

export function process(config: any, issues: IssueSummary[], drillIn: (identifier: string, title: string, cards: IssueSummary[]) => void): any {
    console.log("Processing issues");
    let breakdown = <IssueLabelBreakdown>{};
    breakdown.identifier = (new Date()).getTime() / 1000;

    breakdown.issues = {};
    for (let label of config["breakdown-by-labels"]) {
        let slice = rptLib.filterByLabel(issues, label);
        breakdown.issues[label] = clone(slice);
        drillIn(getDrillName(label, breakdown.identifier), `Issues for ${label}`, slice);
    }

    return breakdown;
}

interface BreakdownRow {
    label: string,
    count: string,
}

export function renderMarkdown(projData, processedData: any): string {
    if (!projData) {
        console.log('no projData');
    }
    
    let breakdown = processedData as IssueLabelBreakdown;

    let lines: string[] = [];

    lines.push(`## Issue Breakdown`);    

    // create a report for each type.  e.g. "Epic"
    // let typeLabel = wipData.cardType === '*'? "": wipData.cardType;
    // lines.push(`## :ship: ${typeLabel} Limits  `);

    let rows: BreakdownRow[] = [];
    for (let label in breakdown.issues) {
        let row = <BreakdownRow>{};
        row.label = label;
        // data folder is part of the contract here.  make a lib function to create this path
        row.count = `[${breakdown.issues[label].length}](./${getDrillName(label, breakdown.identifier)}.md)`;
        rows.push(row);
    }

    let table: string = tablemark(rows);
    lines.push(table);

    return lines.join(os.EOL);
}

export function renderHtml(): string {
    // Not supported yet
    return "";
}


