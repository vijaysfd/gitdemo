public with sharing class CaseHierarchyController {
    public static void testAccount(){
        List<Account> lstAct = [Select id,name from account limit 1];
        //List<SampleSetting__mdt> lstmdt = [select id from SampleSetting__mdt];
       // SampleSetting__mdt lstmdt1 = SampleSetting__mdt.getInstance('m006F000000cq4xQAA');
    }
   /* @AuraEnabled
    public static list<CaseHierarchyWrapper> getChildCases(String parentCaseId) 
    {
        List<CaseHierarchyWrapper> lstCaseWrapper = new List<CaseHierarchyWrapper>();
        set<id> childCaseIds = new set<id>();
        for(case childcase : [select id,CaseNumber,Subject,Origin from case where ParentId  = :parentCaseId])
        {
            CaseHierarchyWrapper caseWrapper = new CaseHierarchyWrapper(); 
            caseWrapper.CaseNumber = childcase.CaseNumber;
            caseWrapper.Subject = childcase.Subject;
            caseWrapper.Origin = childcase.Origin;
            caseWrapper.CaseNumberLink = '/'+childcase.id;
            caseWrapper.currentCaseId = childcase.id;
            childCaseIds.add(childcase.id);
            lstCaseWrapper.add(caseWrapper);
        }
        
        map<id,id>  parentChildCaseMap = findChildCases(childCaseIds);
        setChildCaseIndicator(lstCaseWrapper,parentChildCaseMap);
        return lstCaseWrapper;
    }   */
     @AuraEnabled
    public static map<id,list<CaseHierarchyWrapper>> getChildCases(String parentCaseId) 
    {
        Map<id,list<CaseHierarchyWrapper>> lstCaseMap = new  Map<id,list<CaseHierarchyWrapper>>();
        List<CaseHierarchyWrapper> lstCaseWrapper = new List<CaseHierarchyWrapper>();
        set<id> childCaseIds = new set<id>();
         for(case childcase : [select id,CaseNumber,Subject,Origin,(select id from cases) from case where ParentId  = :parentCaseId])
        {
            CaseHierarchyWrapper caseWrapper = new CaseHierarchyWrapper(); 
            caseWrapper.CaseNumber = childcase.CaseNumber;
            caseWrapper.Subject = childcase.Subject;
            caseWrapper.Origin = childcase.Origin;
            caseWrapper.CaseNumberLink = '/'+childcase.id;
            caseWrapper.currentCaseId = childcase.id;
            caseWrapper.hasChildrenContent = childcase.cases.size() >0 ? true : false;
            childCaseIds.add(childcase.id);
            lstCaseWrapper.add(caseWrapper);
        }
        
        //map<id,id>  parentChildCaseMap = findChildCases(childCaseIds);
        //setChildCaseIndicator(lstCaseWrapper,parentChildCaseMap);
        lstCaseMap.put(parentCaseId, lstCaseWrapper);
        return lstCaseMap;
    } 
    
    /*private static Map<id,id> findChildCases(set<id> parentCaseIdSet)
    {
        Map<id,id> parentChildCaseMap = new Map<id,id>();
        for(case childCases : [select id,parentId from case where parentId in :parentCaseIdSet])
        {
            parentChildCaseMap.put(childCases.parentId,childCases.id);
        }
        
        return parentChildCaseMap;
    }
    
    private static void setChildCaseIndicator(List<CaseHierarchyWrapper> lstCaseWrapper, map<id,id>  parentChildCaseMap)
    {
        for(CaseHierarchyWrapper caseWrapper: lstCaseWrapper)
        {
            if(parentChildCaseMap.get(caseWrapper.currentCaseId) != null)
            {
                caseWrapper.hasChildrenContent = true;
            }
        }
    */
    
    @AuraEnabled
    public static List<CaseHierarchyWrapper> getChilsCasesByParent(string parentId)
    {
         List<CaseHierarchyWrapper> lstCaseWrapper = new List<CaseHierarchyWrapper>();
        set<id> childCaseIds = new set<id>();
        for(case childcase : [select id,CaseNumber,Subject,Origin,(select id from cases) from case where ParentId  = :parentId])
        {
            CaseHierarchyWrapper caseWrapper = new CaseHierarchyWrapper(); 
            caseWrapper.CaseNumber = childcase.CaseNumber;
            caseWrapper.Subject = childcase.Subject;
            caseWrapper.Origin = childcase.Origin;
            caseWrapper.CaseNumberLink = '/'+childcase.id;
            caseWrapper.currentCaseId = childcase.id;
            caseWrapper.hasChildrenContent = childcase.cases.size() >0 ? true : false;
            childCaseIds.add(childcase.id);
            lstCaseWrapper.add(caseWrapper);
        }
        
        //map<id,id>  parentChildCaseMap = findChildCases(childCaseIds);
       // setChildCaseIndicator(lstCaseWrapper,parentChildCaseMap);
        return lstCaseWrapper;
    }
}