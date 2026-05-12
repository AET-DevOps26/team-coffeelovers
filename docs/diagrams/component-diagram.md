<mxGraphModel dx="1220" dy="937" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="system" parent="1" style="swimlane;startSize=60;fontSize=15;fontStyle=1;fillColor=#ffffff;fontColor=#000000;strokeColor=#797979;strokeWidth=2;swimlaneLine=1;align=center;" value="System" vertex="1">
      <mxGeometry height="730" width="720" x="100" y="80" as="geometry" />
    </mxCell>
    <mxCell id="XIR3e_hVE9NUEDQ9AQ93-16" parent="system" style="shape=folder;fontStyle=1;spacingTop=10;tabWidth=40;tabHeight=14;tabPosition=left;html=1;whiteSpace=wrap;fillColor=none;align=left;strokeColor=#5A5A5A;" value="" vertex="1">
      <mxGeometry height="190" width="630" x="45" y="520" as="geometry" />
    </mxCell>
    <mxCell id="springboot" parent="system" style="verticalAlign=top;align=center;spacingTop=8;shape=cube;size=10;direction=south;fontStyle=1;html=1;whiteSpace=wrap;fillColor=#f0f4f7;strokeColor=#8a9baa;fontColor=#1a1a1a;" value="Spring Boot Microservices" vertex="1">
      <mxGeometry height="370" width="200" x="40" y="120" as="geometry" />
    </mxCell>
    <mxCell id="trip-service" parent="system" style="align=left;overflow=fill;html=1;whiteSpace=wrap;fillColor=#f7f9fb;strokeColor=#8a9baa;fontColor=#1a1a1a;" value="&lt;p style=&quot;margin:0px;margin-top:6px;text-align:center;&quot;&gt;&lt;b&gt;Trip Service&lt;/b&gt;&lt;/p&gt;" vertex="1">
      <mxGeometry height="34" width="160" x="60" y="164" as="geometry" />
    </mxCell>
    <mxCell id="trip-service-icon" parent="trip-service" style="shape=component;jettyWidth=8;jettyHeight=4;fillColor=#d0dce6;strokeColor=#8a9baa;" value="" vertex="1">
      <mxGeometry height="20" relative="1" width="20" x="1" as="geometry">
        <mxPoint x="-25" y="4" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="planning-service" parent="system" style="align=left;overflow=fill;html=1;whiteSpace=wrap;fillColor=#f7f9fb;strokeColor=#8a9baa;fontColor=#1a1a1a;" value="&lt;p style=&quot;margin:0px;margin-top:6px;text-align:center;&quot;&gt;&lt;b&gt;Planning Service&lt;/b&gt;&lt;/p&gt;" vertex="1">
      <mxGeometry height="34" width="160" x="60" y="224" as="geometry" />
    </mxCell>
    <mxCell id="planning-service-icon" parent="planning-service" style="shape=component;jettyWidth=8;jettyHeight=4;fillColor=#d0dce6;strokeColor=#8a9baa;" value="" vertex="1">
      <mxGeometry height="20" relative="1" width="20" x="1" as="geometry">
        <mxPoint x="-25" y="4" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="location-service" parent="system" style="align=left;overflow=fill;html=1;whiteSpace=wrap;fillColor=#f7f9fb;strokeColor=#8a9baa;fontColor=#1a1a1a;" value="&lt;p style=&quot;margin:0px;margin-top:6px;text-align:center;&quot;&gt;&lt;b&gt;Location Service&lt;/b&gt;&lt;/p&gt;" vertex="1">
      <mxGeometry height="34" width="160" x="60" y="284" as="geometry" />
    </mxCell>
    <mxCell id="location-service-icon" parent="location-service" style="shape=component;jettyWidth=8;jettyHeight=4;fillColor=#d0dce6;strokeColor=#8a9baa;" value="" vertex="1">
      <mxGeometry height="20" relative="1" width="20" x="1" as="geometry">
        <mxPoint x="-25" y="4" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="user-service" parent="system" style="align=left;overflow=fill;html=1;whiteSpace=wrap;fillColor=#f7f9fb;strokeColor=#8a9baa;fontColor=#1a1a1a;" value="&lt;p style=&quot;margin:0px;margin-top:6px;text-align:center;&quot;&gt;&lt;b&gt;User Service&lt;/b&gt;&lt;/p&gt;" vertex="1">
      <mxGeometry height="34" width="160" x="60" y="344" as="geometry" />
    </mxCell>
    <mxCell id="user-service-icon" parent="user-service" style="shape=component;jettyWidth=8;jettyHeight=4;fillColor=#d0dce6;strokeColor=#8a9baa;" value="" vertex="1">
      <mxGeometry height="20" relative="1" width="20" x="1" as="geometry">
        <mxPoint x="-25" y="4" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="react" parent="system" style="align=left;overflow=fill;html=1;whiteSpace=wrap;fillColor=#f4f7fa;strokeColor=#8a9baa;fontColor=#1a1a1a;" value="&lt;p style=&quot;margin:0px;margin-top:6px;text-align:center;&quot;&gt;&lt;b&gt;React Frontend&lt;/b&gt;&lt;/p&gt;" vertex="1">
      <mxGeometry height="50" width="180" x="480" y="120" as="geometry" />
    </mxCell>
    <mxCell id="react-icon" parent="react" style="shape=component;jettyWidth=8;jettyHeight=4;fillColor=#d0dce6;strokeColor=#8a9baa;" value="" vertex="1">
      <mxGeometry height="20" relative="1" width="20" x="1" as="geometry">
        <mxPoint x="-25" y="4" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="genai" parent="system" style="align=left;overflow=fill;html=1;whiteSpace=wrap;fillColor=#faf8f5;strokeColor=#aaa090;fontColor=#1a1a1a;" value="&lt;p style=&quot;margin:0px;margin-top:6px;text-align:center;&quot;&gt;&lt;b&gt;Python GenAI Service&lt;/b&gt;&lt;/p&gt;&lt;p style=&quot;margin:0px;text-align:center;color:#7a7a7a;&quot;&gt;LangChain&lt;/p&gt;" vertex="1">
      <mxGeometry height="54" width="180" x="478" y="218" as="geometry" />
    </mxCell>
    <mxCell id="genai-icon" parent="genai" style="shape=component;jettyWidth=8;jettyHeight=4;fillColor=#ddd8cc;strokeColor=#aaa090;" value="" vertex="1">
      <mxGeometry height="20" relative="1" width="20" x="1" as="geometry">
        <mxPoint x="-25" y="4" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="ps-ts" edge="1" parent="system" source="planning-service" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=classic;endFill=1;html=1;strokeColor=#aaaaaa;" target="trip-service">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="ps-ls" edge="1" parent="system" source="planning-service" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=classic;endFill=1;html=1;strokeColor=#aaaaaa;" target="location-service">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="ts-us" edge="1" parent="system" source="trip-service" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=classic;endFill=1;html=1;strokeColor=#aaaaaa;" target="user-service">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="lollipop-react-label" parent="system" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontColor=#3a3a3a;fontSize=11;" value="REST API" vertex="1">
      <mxGeometry height="20" width="70" x="344" y="115" as="geometry" />
    </mxCell>
    <mxCell id="lollipop-genai-label" parent="system" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontColor=#3a3a3a;fontSize=11;" value="AI generation" vertex="1">
      <mxGeometry height="20" width="70" x="344" y="215" as="geometry" />
    </mxCell>
    <mxCell id="react-lollipop-line" edge="1" parent="system" style="endArrow=oval;endFill=0;endSize=10;html=1;strokeColor=#5A5A5A;" value="">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="240" y="144" as="sourcePoint" />
        <mxPoint x="380" y="144" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="react-socket-line" edge="1" parent="system" style="endArrow=halfCircle;endFill=0;endSize=6;html=1;strokeColor=#5A5A5A;" value="">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="480" y="144" as="sourcePoint" />
        <mxPoint x="380" y="144" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="genai-lollipop-line" edge="1" parent="system" source="genai" style="endArrow=oval;endFill=0;endSize=10;html=1;strokeColor=#5A5A5A;exitX=0;exitY=0.5;exitDx=0;exitDy=0;" value="">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="478" y="245" as="sourcePoint" />
        <mxPoint x="390" y="245" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="genai-socket-line" edge="1" parent="system" style="endArrow=halfCircle;endFill=0;endSize=6;html=1;strokeColor=#5A5A5A;" value="">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="240" y="245" as="sourcePoint" />
        <mxPoint x="390" y="245" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="XIR3e_hVE9NUEDQ9AQ93-18" parent="system" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;rounded=0;fontStyle=1" value="PostgreSQL" vertex="1">
      <mxGeometry height="30" width="140" x="63" y="535" as="geometry" />
    </mxCell>
    <mxCell id="trip-db" parent="system" style="shape=datastore;whiteSpace=wrap;html=1;fillColor=#f7f9fb;fontColor=#1a1a1a;strokeColor=#8a9baa;" value="trip schema" vertex="1">
      <mxGeometry height="60" width="110" x="515" y="600" as="geometry" />
    </mxCell>
    <mxCell id="planning-db" parent="system" style="shape=datastore;whiteSpace=wrap;html=1;fillColor=#f7f9fb;fontColor=#1a1a1a;strokeColor=#8a9baa;" value="planning schema" vertex="1">
      <mxGeometry height="60" width="120" x="363" y="600" as="geometry" />
    </mxCell>
    <mxCell id="location-db" parent="system" style="shape=datastore;whiteSpace=wrap;html=1;fillColor=#f7f9fb;fontColor=#1a1a1a;strokeColor=#8a9baa;" value="location schema" vertex="1">
      <mxGeometry height="60" width="120" x="220" y="600" as="geometry" />
    </mxCell>
    <mxCell id="user-db" parent="system" style="shape=datastore;whiteSpace=wrap;html=1;fillColor=#f7f9fb;fontColor=#1a1a1a;strokeColor=#8a9baa;" value="user schema" vertex="1">
      <mxGeometry height="60" width="110" x="85" y="600" as="geometry" />
    </mxCell>
    <mxCell id="ts-db" edge="1" parent="system" source="trip-service" style="endArrow=none;dashed=1;html=1;strokeColor=#aaaaaa;" target="trip-db">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="ps-db" edge="1" parent="system" source="planning-service" style="endArrow=none;dashed=1;html=1;strokeColor=#aaaaaa;" target="planning-db">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="ls-db" edge="1" parent="system" source="location-service" style="endArrow=none;dashed=1;html=1;strokeColor=#aaaaaa;" target="location-db">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="us-db" edge="1" parent="system" source="user-service" style="endArrow=none;dashed=1;html=1;strokeColor=#aaaaaa;" target="user-db">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="llm" parent="1" style="align=left;overflow=fill;html=1;whiteSpace=wrap;fillColor=#faf8f5;strokeColor=#aaa090;fontColor=#1a1a1a;" value="&lt;p style=&quot;margin:0px;margin-top:6px;text-align:center;&quot;&gt;&lt;b&gt;External LLM System&lt;/b&gt;&lt;/p&gt;" vertex="1">
      <mxGeometry height="50" width="180" x="940" y="300" as="geometry" />
    </mxCell>
    <mxCell id="llm-icon" parent="llm" style="shape=component;jettyWidth=8;jettyHeight=4;fillColor=#ddd8cc;strokeColor=#aaa090;" value="" vertex="1">
      <mxGeometry height="20" relative="1" width="20" x="1" as="geometry">
        <mxPoint x="-25" y="4" as="offset" />
      </mxGeometry>
    </mxCell>
    <mxCell id="genai-llm" edge="1" parent="1" source="genai" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=block;endFill=1;html=1;strokeColor=#5a5a5a;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" target="llm">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>