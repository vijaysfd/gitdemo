public class CaseHierarchyWrapper {
    @AuraEnabled
    public string CaseNumberLink;
    @AuraEnabled
    public string CaseNumber;
    @AuraEnabled
    public string Subject;
    @AuraEnabled
    public string Origin;
    @AuraEnabled
    public list<caseHierarchyWrapper> children;
    @AuraEnabled
    public id currentCaseId;
    @AuraEnabled
    public boolean hasChildrenContent = false;
    @AuraEnabled
    public boolean showChildRecords = false;
    
}