import random as ra
lst=list(range(ra.randint(5,9),ra.randint(10**4,15000)))
def collatz(num):
    if(num==1):
        return
    else:
        if(num%2==0):
            print((num//2),end=' ')
            collatz(num//2)
        else:
            print((3*num+1),end=' ')
            collatz((3*num+1))
                                                            
for i in lst:
    print(f"Collatz Sequence for the Number {i} is : ",end='\t')
    collatz(i)
    #print(end='\n')
    print()
    
