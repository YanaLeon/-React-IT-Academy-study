import {EventEmitter} from 'events';

let companyEvents = new EventEmitter();
// событие "EClentEdit" - нажата кнопка редактировать, его сэмиттирует MobileClient и примет MobileCompany
// событие "EClentDelete" - нажата кнопка удалить, его сэмиттирует MobileClient и примет MobileCompany
// событие "EClentSave" - нажата кнопка сохранить, его сэмиттирует MobileClientEdit и примет MobileCompany
// событие "EClentAdd" - нажата кнопка добавить, его сэмиттирует MobileClientEdit и примет MobileCompany
// событие "EClentCancelAddClient" - нажата кнопка отменить, его сэмиттирует MobileClientEdit и примет MobileCompany
// событие "EClentAll" - нажата кнопка все, его сэмиттирует MobileCompany и примет MobileCompany
// событие "EClentActive" - нажата кнопка активные, его сэмиттирует MobileCompany и примет MobileCompany
// событие "EClentBlock" - нажата кнопка заблокированные, его сэмиттирует MobileCompany и примет MobileCompany

export {companyEvents};