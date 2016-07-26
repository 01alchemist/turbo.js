/// <reference path='../../../../../typings/globals/node/index.d.ts' />
import {UsageError} from "../errors/UsageError";
import fs = require("fs");
import {Source} from "./Source";
import {CapturedError} from "../errors/CapturedError";
import {DefinitionService} from "../services/DefinitionService";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class SourceProvider {

    allSources:Source[] = [];
    definitionService:DefinitionService;

    constructor(args:string[]) {

        this.definitionService = new DefinitionService;

        try {
            for (let input_file of args) {
                if (!(/.\.t[js|ts]+$/.test(input_file))) {
                    throw new UsageError("Bad file name (must be *.tjs or tts): " + input_file);
                }
                let text = fs.readFileSync(input_file, "utf8");
                let lines = text.split("\n");
                let [defs, residual] = this.definitionService.collectDefinitions(input_file, lines);
                let output_file = input_file.replace(/\.t([js|ts]+)$/, ".$1");
                this.allSources.push(new Source(input_file, output_file, defs, residual));
            }
        }catch (e) {
            if (e instanceof CapturedError)
                console.log(e.message);
            else
                console.log(e);
            process.exit(1);
        }
    }
}