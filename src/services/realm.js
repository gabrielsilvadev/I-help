import Realm from 'realm';
import RepositoryScrema from '../schemas/reposytoriSchema';
export default function getRealm(){
    return Realm.open({
        schema:[RepositoryScrema],
    });
}