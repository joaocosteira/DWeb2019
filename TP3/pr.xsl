<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    
    version="2.0">
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <!-- xmlns:xs="http://www.w3.org/2001/XMLSchema" -->
    <!-- exclude-result-prefixes="xs"--> 
    
    <!--
        Parse da informação do header 
    -->
    
    <!--Match da root do html -> Definimos os headers da pagina-->
    <xsl:template match="/">
        <html>
            <head>
                <title>Project Record</title>
                <meta charset="UTF8" />
            </head>
            <body>
                <h1 align="center">Project Record</h1>
                <hr />
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <!--
        Representar a informação do metadata:
            Do ficheiro dtd:
            metadata (keyname,title,subtitle?,supervisor,bdate,edate)
    -->
    
    <xsl:template match="metadata">
        <table>
            <tr>
                <td width="50%">
                    <!--Obeter o valor com a tag keyname do ficheiro xml.-->
                    <b>Key Name: </b><xsl:value-of select="keyname"></xsl:value-of>
                </td>
                <td width="50%">
                    <b>Begin Date: </b><xsl:value-of select="bdate"></xsl:value-of>
                </td>
            </tr>
            <tr>
                <td width="50%">
                    <b>Title: </b><xsl:value-of select="title"></xsl:value-of>
                </td>
                <td width="50%">
                    <b>End Date:</b><xsl:value-of select="edate"></xsl:value-of>
                </td>
            </tr>
            <tr>
                <xsl:if test="subtitle">
                    <td width="50%">
                        <b>Subtitle: </b><xsl:value-of select="subtitle"></xsl:value-of>
                    </td>
                </xsl:if>
                
                <td width="50%">
                    <b>Supervisor: </b><xsl:value-of select="supervisor"></xsl:value-of>
                </td>
            </tr>
        </table>
        <hr />
        
        
    </xsl:template>
    
    <!--Parse do workteam-->
    
    <xsl:template match="workteam">
        <hr />
        <h3>WorkTeam </h3>
        <ol>
            <xsl:for-each select="worker">
                <li>
                    <b><xsl:value-of select="identifier"/>: </b><xsl:value-of select="name"> </xsl:value-of>
                    <br /><a href="mailto:{email}"> <xsl:value-of select="email"></xsl:value-of></a>
                </li>
            </xsl:for-each>
        </ol>
    </xsl:template>
    
    <!--
     Informação do abstract
    -->
    <xsl:template match="abstract">
        <hr /><hr />
       <h3>Abstract</h3> 
        <xsl:for-each select="p">
            <p> <xsl:value-of select="."/></p>
        </xsl:for-each>
    </xsl:template>
    
    <!--
    
    -->
    <xsl:template match="deliverables">
        <hr /><hr />
        <h3>Deliverables</h3>
        <xsl:for-each select="deliverable">
            <li>
                <a href="{.}"><xsl:value-of select="@path" /></a>
            </li>
        </xsl:for-each>
    </xsl:template>
    
</xsl:stylesheet>