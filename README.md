# dron-remote
 Proyecto que permite el control de un dron vía remota. El dron y cliente establecen una comunicación mediante un protocolo websocket en el que el controlClient envía instrucciones de movimientos y coordenadas para ser ejecutadas por el dron

```mermaid
sequenceDiagram
Dron->>Server: Connect?
Server-->>Dron: OK
loop checkCurrentStatusReady
    Dron->>Server: send(Position, defaultProperties)
end
Note over Dron, Server: Register DronId!
ClientContol->>Server: Dron available(dronnId)?
Note right of Server: MatchDron and User
Server->>ClientContol: send (DronId, status)
loop dronConnected
    alt DronIsReady
        ClientContol->>+Server: send(dronnId, order)
        Server->>Server: matchDron(DronId)
        Server->>-Dron: send(Order)
        Dron-->>+Server: sendOrderDone(Order, dronId)
        Server->>Server: matchClientControl(DronId)
        Server->>-ClientContol: sendOrderDone(order)
    else
    Dron->>Server: sendWaitStatus(Position)
    end
end
```
