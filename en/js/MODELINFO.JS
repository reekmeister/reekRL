function CreateModelInf()
{
   var   i,j;
   i = 0;
   gModelInfo[i] = SetModelInf('2007');
   j = 0;
   gModelInfo[i].CodeList[j++] = SetModelCode('KB1');
   i++;
   gModelInfo[i] = SetModelInf('2008');
   j = 0;
   gModelInfo[i].CodeList[j++] = SetModelCode('KB1');
   i++;
   gModelInfo[i] = SetModelInf('2009');
   j = 0;
   gModelInfo[i].CodeList[j++] = SetModelCode('KB2');
   i++;
   gModelInfo[i] = SetModelInf('2010');
   j = 0;
   gModelInfo[i].CodeList[j++] = SetModelCode('KB2');
   i++;
}
function SetModelInf(strYear)
{
   var  data = new Array;
   data.Year = strYear;
   data.CodeList = new Array;
   return data;
}
function SetModelCode(strCode)
{
   var  data = new Array;
   data.Code = strCode;
   return data;
}
function SetManualType()
{
   gSmFlag = 1;
   gBrmFlag = 1;
}
