*Settings*
Documentation       Testando o método HTTP POST

Resource        ${EXECDIR}/resources/Base.robot

*Test Cases*
Deve criar uma tarefa
    
    ${token}        Get Auth Token   papito@msn.com     pwd123

    ${headers}      Create Dictionary    Authorization=${token}
    ${task}         Create Dictionary    title=Estudar Nodejs        done=false

    ${response}     POST        ${TASKS_API}/tasks      json=${task}    headers=${headers}

    Status Should Be        200         ${response}

*Keywords*
Get Auth Token
    [Arguments]     ${email}        ${password}

    ${user}         Create Dictionary   email=${email}        password=${password}
    ${response}     POST                ${USERS_API}/auth     json=${user}
    ${token}        Set Variable        Bearer ${response.json()}[token]

    [return]        ${token}
