import {Pipe, PipeTransform} from '@angular/core';
import {DEFAULT_ACTIONS} from "../constants/settings";

@Pipe({
    name: 'buildFolderUrl'
})
export class BuildFolderUrlPipe implements PipeTransform {

    transform(routerUrl: any, args?: any): any {
        let splittedUrl = routerUrl.split('/');
        return splittedUrl.filter(r => !DEFAULT_ACTIONS.includes(r)).join('/');
    }

}
